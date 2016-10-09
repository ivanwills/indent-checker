/* global require, describe, it */

var assert = require('assert')
	indent = require('../index');

describe('Asserting text status quick', () => {
	it('Bad text', () => {
		assert.throws(
			() => indent.assertIndent('\tA line\n space sepparated\n', {quick: true}),
			/^Using spaces/,
			'Error thrown for initally tab indented text'
		);
		assert.throws(
			() => indent.assertIndent('\tA line\n \tspace sepparated\n', {quick: true}),
			/^Using spaces/,
			'Error thrown for initally tab indented text'
		);
		assert.throws(
			() => indent.assertIndent(' A line\n\ttab sepparated\n', {quick: true}),
			/^Using tabs/,
			'Error thrown for initally tab indented text'
		);
		assert.throws(
			() => indent.assertIndent(' A line\n\ttab sepparated\n', {quick: true}),
			/^Using tabs/,
			'Error thrown for initally tab indented text'
		);

		assert.throws(
			() => indent.assertIndent(' A line\n', {quick: true, type: 'tabs'}),
			/^Using spaces/,
			'Error thrown for explicitely tab indented text'
		);
		assert.throws(
			() => indent.assertIndent('\t A line\n', {quick: true, type: 'tabs'}),
			/^Using spaces/,
			'Error thrown for explicitely tab indented text with mixed tabs and spaces'
		);

		assert.throws(
			() => indent.assertIndent('\tA line\n', {quick: true, type: 'spaces'}),
			/^Using tabs/,
			'Error thrown for explicitely space indented text'
		);
		assert.throws(
			() => indent.assertIndent(' \tA line\n', {quick: true, type: 'spaces'}),
			/^Using tabs/,
			'Error thrown for explicitely space indented text with mixed tabs and spaces'
		);
		assert.throws(
			() => indent.assertIndent(' \t A line\n', {quick: true}),
			/^Mixing tabs and spaces/,
			'Testing for mixed error'
		);
	});
});

describe('Asserting text status', () => {
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
