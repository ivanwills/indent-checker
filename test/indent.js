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
	it('Jsdoc style documentation should not be allowed', () => {
		assert.equal(indent.textOk('\t * indented some doc\n'), false);
	});
	it('Jsdoc style documentation should be allowed', () => {
		assert.equal(indent.textOk('  * some doc\n', {jsdoc: true}), true);
		assert.equal(indent.textOk(' * some doc\n', {jsdoc: true, type: 'tabs'}), true);
		assert.equal(indent.textOk('\t * indented some doc\n', {jsdoc: true}), true);
	});
	it('Jsdoc style documentation should be allowed, with bad indents', () => {
		assert.equal(indent.textOk('  * some doc\n', {type: 'tabs', jsdoc: true}), false);
		assert.equal(indent.textOk(' some doc\n', {type: 'tabs', jsdoc: true}), false);
	});
});

describe('Asserting text status', () => {
	it('Good text', () => {
		assert.doesNotThrow(() => indent.assertIndent('A line\n space sepparated\n'), 'No error thrown for good text with space indents');
		assert.doesNotThrow(() => indent.assertIndent('  A line\n space sepparated\n'), 'No error thrown for good text with space indents');
		assert.doesNotThrow(() => indent.assertIndent('A line\n\ttab sepparated\n'), 'No error thrown for good text with tab indents');
		assert.doesNotThrow(() => indent.assertIndent('\t\tA line\n\ttab sepparated\n'), 'No error thrown for good text with tab indents');
	});
});
