/* global require, describe, it */

var assert = require('assert')
	indent = require('../index');

describe('Good lines of text', function () {

	it('All spaces', function () {
		assert.equal(indent.textOk('  my line', true));
		assert.equal(indent.textOk(' my line', true));
		assert.equal(indent.textOk(' my line\n  another line\n', true));
	});

	it('All tabs', function () {
		assert.equal(indent.textOk('\t\tmy line', true));
		assert.equal(indent.textOk('\tmy line', true));
		assert.equal(indent.textOk('\tmy line\n\t\tanother line\n', true));
	});
});
