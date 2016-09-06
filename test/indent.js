/* global require, describe, it */

var assert = require('assert')
	indent = require('../index');

describe('Good lines of text', function () {
	it('All spaces', function () {
		assert.equal(indent.textOk('my line', true));
		assert.equal(indent.textOk('  my line', true));
		assert.equal(indent.textOk(' my line', true));
		assert.equal(indent.textOk(' my line\n  another line\n', true));
	});

	it('All tabs', function () {
		assert.equal(indent.textOk('my line', true));
		assert.equal(indent.textOk('\t\tmy line', true));
		assert.equal(indent.textOk('\tmy line', true));
		assert.equal(indent.textOk('\tmy line\n\t\tanother line\n', true));
		assert.equal(indent.textOk('\tmy\tline', true));
	});

	it('Files', function () {
		assert.equal(indent.fileOk('index.js', true));
	});

});

describe('Mixed lines of text', function () {
	it('Miing tabs and spaces', function () {
		assert.equal(indent.textOk(' \tmy line', false));
		assert.equal(indent.textOk('\t my line', false));
		assert.equal(indent.textOk(' \t \tmy line', false));
		assert.equal(indent.textOk(' my line\n \t another line\n', false));
	});
});
