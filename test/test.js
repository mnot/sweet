#!/usr/bin/env node

var sweet = require('../lib/index');
var assert = require('assert');

var test_cases = [
  {
    disposition: 'attachment',
    filename: 'foo.html',
    filename_fallback: 'foo.html',
    expected: 'attachment; filename="foo.html"'
  },
  {
    disposition: 'attachment',
    filename: 'foo.html',
    expected: 'attachment; filename="foo.html"'
  },
  {
    disposition: 'attachment',
    filename: 'foo bar.html',
    expected: 'attachment; filename="foo bar.html"'
  },
  {
    disposition: 'attachment',
    filename: 'foo "bar".html',
    expected: 'attachment; filename="foo \\"bar\\".html"'
  },
  {
    disposition: 'attachment',
    filename: 'foo%20bar.html',
    filename_fallback: 'foo bar.html',
    expected: 'attachment; filename="foo bar.html"; filename*=utf-8\'\'foo%2520bar.html'
  },
  {
    disposition: 'attachment',
    filename: 'foo%20bar.html',
    expected: null
  },
  {
    disposition: 'attachment',
    filename: 'foo/bar.html',
    expected: null
  },
  {
    disposition: 'attachment',
    filename: '/foo.html',
    expected: null
  },
  {
    disposition: 'attachment',
    filename: 'foo\bar.html',
    expected: null
  },
  {
    disposition: 'attachment',
    filename: '\foo.html',
    expected: null
  },
  {
    disposition: 'attachment',
    filename: 'föö.html',
    expected: null
  },
  {
    disposition: 'attachment',
    filename: 'föö.html',
    filename_fallback: 'foo.html',
    expected: 'attachment; filename="foo.html"; filename*=utf-8\'\'f%C3%B6%C3%B6.html'
  }
];

for (test_num in test_cases) {
  var test_case = test_cases[test_num];
  var generated = sweet.make_disposition(
    test_case.disposition,
    test_case.filename,
    test_case.filename_fallback
  );
  assert.equal(generated, test_case.expected, 
    "failed " + test_num + " (" + generated + ")"
  );
}