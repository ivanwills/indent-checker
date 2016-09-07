/* global require, describe, it */

var assert = require('assert')
	indent = require('../index');

describe('Good lines of text', function () {
	it('All spaces', function () {
		assert.equal(indent.textOk('my line'), true);
		assert.equal(indent.textOk('  my line'), true);
		assert.equal(indent.textOk(' my line'), true);
		assert.equal(indent.textOk(' my line\n  another line\n'), true);
	});

	it('All tabs', function () {
		assert.equal(indent.textOk('my line'), true);
		assert.equal(indent.textOk('\t\tmy line'), true);
		assert.equal(indent.textOk('\tmy line'), true);
		assert.equal(indent.textOk('\tmy line\n\t\tanother line\n'), true);
		assert.equal(indent.textOk('\tmy\tline'), true);
	});

	it('Files', function () {
		assert.equal(indent.fileOk('index.js'), true);
	});

});

describe('Mixed lines of text', function () {
	it('Miing tabs and spaces', function () {
		assert.equal(indent.textOk(' \tmy line'), false);
		assert.equal(indent.textOk('\t my line'), false);
		assert.equal(indent.textOk(' \t \tmy line'), false);
		assert.equal(indent.textOk(' my line\n \t another line\n'), false);
	});
});

describe('Asserting text status', function () {
	it('Good text', function () {
		assert.doesNotThrow(function () {
			indent.assertIndent('A line\n space sepparated\n');
		}, 'No error thrown for good text with space indents');
		assert.doesNotThrow(function () {
			indent.assertIndent('  A line\n space sepparated\n');
		}, 'No error thrown for good text with space indents');
		assert.doesNotThrow(function () {
			indent.assertIndent('A line\n\ttab sepparated\n');
		}, 'No error thrown for good text with tab indents');
		assert.doesNotThrow(function () {
			indent.assertIndent('\t\tA line\n\ttab sepparated\n');
		}, 'No error thrown for good text with tab indents');
	});

	it('Bad text', function () {
		assert.throws(
			function () {
				indent.assertIndent('\tA line\n space sepparated\n');
			},
			/^Using spaces/,
			'Error thrown for initally tab indented text'
		);
		assert.throws(
			function () {
				indent.assertIndent('\tA line\n \tspace sepparated\n');
			},
			/^Using spaces/,
			'Error thrown for initally tab indented text'
		);
		assert.throws(
			function () {
				indent.assertIndent(' A line\n\ttab sepparated\n');
			},
			/^Using tabs/,
			'Error thrown for initally tab indented text'
		);
		assert.throws(
			function () {
				indent.assertIndent(' A line\n\ttab sepparated\n');
			},
			/^Using tabs/,
			'Error thrown for initally tab indented text'
		);

		assert.throws(
			function () {
				indent.assertIndent(' A line\n', {type: 'tabs'});
			},
			/^Using spaces/,
			'Error thrown for explicitely tab indented text'
		);

		assert.throws(
			function () {
				indent.assertIndent('\tA line\n', {type: 'spaces'});
			},
			/^Using tabs/,
			'Error thrown for explicitely space indented text'
		);
	});
});
