/* global require, describe, it */

var assert = require('assert')
	indent = require('../index');

describe('Good lines of text', () => {
	it('All spaces', () => {
		assert.equal(indent.textOk('my line'), true);
		assert.equal(indent.textOk('  my line'), true);
		assert.equal(indent.textOk(' my line'), true);
		assert.equal(indent.textOk(' my line\n  another line\n'), true);
	});

	it('All tabs', () => {
		assert.equal(indent.textOk('my line'), true);
		assert.equal(indent.textOk('\t\tmy line'), true);
		assert.equal(indent.textOk('\tmy line'), true);
		assert.equal(indent.textOk('\tmy line\n\t\tanother line\n'), true);
		assert.equal(indent.textOk('\tmy\tline'), true);
	});

	it('Files', () => assert.equal(indent.fileOk('index.js'), true));

});

describe('Mixed lines of text', () => {
	it('Miing tabs and spaces', () => {
		assert.equal(indent.textOk(' \tmy line'), false);
		assert.equal(indent.textOk('\t my line'), false);
		assert.equal(indent.textOk(' \t \tmy line'), false);
		assert.equal(indent.textOk(' my line\n \t another line\n'), false);
	});
});

describe('Documentation type', () => {
	it('Jsdoc style documentation should be allowed', () => {
		assert.equal(indent.textOk('\t * indented some doc\n'), false);
		assert.equal(indent.textOk('  * some doc\n', {jsdoc: true}), true);
		assert.equal(indent.textOk(' * some doc\n', {jsdoc: true, type: 'tabs'}), true);
		assert.equal(indent.textOk('\t * indented some doc\n', {jsdoc: true}), true);
	});
});

describe('Asserting text status', () => {
	it('Good text', () => {
		assert.doesNotThrow(() => indent.assertIndent('A line\n space sepparated\n'), 'No error thrown for good text with space indents');
		assert.doesNotThrow(() => indent.assertIndent('  A line\n space sepparated\n'), 'No error thrown for good text with space indents');
		assert.doesNotThrow(() => indent.assertIndent('A line\n\ttab sepparated\n'), 'No error thrown for good text with tab indents');
		assert.doesNotThrow(() => indent.assertIndent('\t\tA line\n\ttab sepparated\n'), 'No error thrown for good text with tab indents');
	});

	it('Bad text', () => {
		assert.throws(
			() => indent.assertIndent('\tA line\n space sepparated\n'),
			/^Using spaces/,
			'Error thrown for initally tab indented text'
		);
		assert.throws(
			() => indent.assertIndent('\tA line\n \tspace sepparated\n'),
			/^Using spaces/,
			'Error thrown for initally tab indented text'
		);
		assert.throws(
			() => indent.assertIndent(' A line\n\ttab sepparated\n'),
			/^Using tabs/,
			'Error thrown for initally tab indented text'
		);
		assert.throws(
			() => indent.assertIndent(' A line\n\ttab sepparated\n'),
			/^Using tabs/,
			'Error thrown for initally tab indented text'
		);

		assert.throws(
			() => indent.assertIndent(' A line\n', {type: 'tabs'}),
			/^Using spaces/,
			'Error thrown for explicitely tab indented text'
		);
		assert.throws(
			() => indent.assertIndent('\t A line\n', {type: 'tabs'}),
			/^Using spaces/,
			'Error thrown for explicitely tab indented text with mixed tabs and spaces'
		);

		assert.throws(
			() => indent.assertIndent('\tA line\n', {type: 'spaces'}),
			/^Using tabs/,
			'Error thrown for explicitely space indented text'
		);
		assert.throws(
			() => indent.assertIndent(' \tA line\n', {type: 'spaces'}),
			/^Using tabs/,
			'Error thrown for explicitely space indented text with mixed tabs and spaces'
		);
	});
});
