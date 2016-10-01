/* global module require */

var _  = require('lodash'),
	fs = require('fs');

function assertIndent (text, config) {
	if (!config) {
		config = {};
	}
	var indents = config.type || false;
	var indentMatch = config.jsdoc ? /^(\s*)(?![*])/ : /^(\s+)/;

	_.each(text.split(/\n/), function (line, lineNo) {
		var match  = line.match(indentMatch);
		if (!match || !match[1]) {
			// skip lines with no indentation
			return;
		}
		var indent = match[1];

		if (indents === 'tabs') {
			if (indent.match(/ /)) {
				throw 'Using spaces in a file indented with tabs, starting line ' + (lineNo + 1) + '!';
			}
		}
		else if (indents === 'spaces') {
			if (indent.match(/\t/)) {
				throw 'Using tabs in a file indented with spaces, starting line ' + (lineNo + 1) + '!';
			}
		}
		else {
			// set the default indent style for the text when we first see
			// an indented line
			indents = line.match(/^\t/) ? 'tabs' : 'spaces';
		}

		// always check for mixed indentation
		if (indent.match(/\t+ | +\t/)) {
			throw 'Mixed tabs and spaces for indentation on line ' + (lineNo + 1) + '!';
		}
	});
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
