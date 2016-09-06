[![Build Status](https://travis-ci.org/ivanwills/indent-checker.svg?branch=master)](https://travis-ci.org/ivanwills/indent-checker?branch=master)
[![Coverage Status](https://coveralls.io/repos/ivanwills/indent-checker/badge.svg?branch=master)](https://coveralls.io/r/ivanwills/indent-checker?branch=master)
[![Dependency Status](https://david-dm.org/ivanwills/indent-checker.svg)](https://david-dm.org/ivanwills/indent-checker.svg)
[![Code Quality](https://www.codacy.com/project/badge/23cf2066e4654fdba5e6d50f1f729268)](https://www.codacy.com/app/ivan-wills/indent-checker)

indent-checker
==============

Simple library to test if file indentation rules are being met

Version
=======

This documentation refers to indent-checker verions 0.1.0

Synopsis
========

```js
var indent = require('indent-checker');
var text   = "\t\tSome text\n   Other line\n";

if (! indent.textOk(text)) {
    console.error('Text badly indented!');
}

if (indent.fileOk('some-file.json')) {
    console.log('some-file.json is well indented!');
}
```

Description
===========

*indent-checker* is a library to check that text/files follow indentation
rules. The default rule is that no line should mix indentation syles eg have
both tabs and spaces on a line.