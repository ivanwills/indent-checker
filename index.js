/* global module require */

var _  = require('lodash'),
	fs = require('fs');

function assertIndent (text, config) {
	if (!config) {
		config = {};
	}
	var indents = config.type || false;

	_.each(text.split(/\n/), function (line, lineNo) {
		if (indents === 'tabs') {
			if (line.match(/^ /)) {
				throw 'Using spaces in a file indented with tabs, starting line ' + lineNo + '!';
			}
		}
		else if (indents === 'spaces') {
			if (line.match(/^\t/)) {
				throw 'Using tabs in a file indented with spaces, starting line ' + lineNo + '!';
			}
		}
		else if (line.match(/^\s+/)) {
			// set the default indent style for the text when we first see
			// an indented line
			indents = line.match(/^\t/) ? 'tabs' : 'spaces';
		}

		// always check for mixed indentation
		if (line.match(/^\t+ |^ +\t/)) {
			throw 'Mixed tabs and spaces for indentation on line ' + lineNo + '!';
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
