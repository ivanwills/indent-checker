/* global module require */

var _  = require('lodash'),
	fs = require('fs');

function textOk (text, config) {
	_.each(text.split(/\n/), function (line) {
		try {
			if (line.match(/^\t+ |^ +\t/)) {
				throw "Mixed tabs and spaces on indent!";
			}
		} catch (e) {
			return false;
		}

		return true;
	});
};

module.exports = {
	textOk: textOk,
	fileOk: function (file, config) {
		return textOk(fs.readFileSync(file, 'utf-8'), config);
	}
};
