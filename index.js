/* global module require */

var _  = require('lodash'),
	fs = require('fs');

function IndentError (details) {
	_.each(details, function (value, key) {
		this[key] = value;
	}.bind(this));
}
IndentError.prototype.toString = function () { return this.message; };

function addError (error, type, line, message) {
	if (error) {
		if (!error[type]) {
			error[type] = [];
		}
		error[type].push(line);
		error.total++;

		return error;
	}
	error = new IndentError({
		total: 1,
		message: message
	});
	error[type] = [line];
	return error;
}

function assertIndent (text, config) {
	if (!config) {
		config = {};
	}
	var indents = config.type || false;
	var indentMatch = config.jsdoc ? /^(\s*)(?![*])/ : /^(\s+)/;
	var errors;

	_.each(text.split(/\n/), function (line, lineNo) {
		var match  = line.match(indentMatch);
		if (!match || !match[1]) {
			// skip lines with no indentation
			return;
		}
		var indent = match[1];

		if (indents === 'tabs') {
			if (indent.match(/ /)) {
				if (config.quick) {
					throw 'Using spaces in a file indented with tabs, starting line ' + (lineNo + 1) + '!';
				}
				errors = addError(errors, 'spaces', lineNo + 1, 'Using spaces in a file indented with tabs');
			}
		}
		else if (indents === 'spaces') {
			if (indent.match(/\t/)) {
				if (config.quick) {
					throw 'Using tabs in a file indented with spaces, starting line ' + (lineNo + 1) + '!';
				}
				errors = addError(errors, 'tabs', lineNo + 1, 'Using tabs in a file indented with spaces');
			}
		}
		else {
			// set the default indent style for the text when we first see
			// an indented line
			indents = line.match(/^\t/) ? 'tabs' : 'spaces';
		}

		// always check for mixed indentation
		if (indent.match(/\t+ | +\t/)) {
			if (config.quick) {
				throw 'Mixing tabs and spaces for indentation on line ' + (lineNo + 1) + '!';
			}
			errors = addError(errors, 'mixed', lineNo + 1, 'Mixing tabs and spaces');
		}
	});

	if (errors) {
		throw errors;
	}
}

function textOk (text, config) {
	try {
		assertIndent(text, config);
	} catch (e) {
		return false;
	}

	return true;
};

module.exports = {
	assertIndent: assertIndent,
	textOk: textOk,
	fileOk: function (file, config) {
		return textOk(fs.readFileSync(file, 'utf-8'), config);
	}
};
