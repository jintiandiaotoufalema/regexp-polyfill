"use strict";

const ReRegExp = require("C:\\Users\\viruser.v-desktop\\Desktop\\regexp-polyfill\\dist\\ReRegExp.js");
var babeled = true;
if (babeled) {
  test('regex convert', function () {
    expect(new ReRegExp("abc", "")).toBeInstanceOf(ReRegExp);
    expect(new ReRegExp("abc", "g")).toBeInstanceOf(ReRegExp);
    expect(new ReRegExp('abc')).toBeInstanceOf(ReRegExp);
    expect(new ReRegExp('abc')).toBeInstanceOf(ReRegExp);
    expect(new ReRegExp(new ReRegExp("abc", ""))).toBeInstanceOf(ReRegExp);
    expect(new ReRegExp(new ReRegExp("abc", "g"))).toBeInstanceOf(ReRegExp);
  });
}
test('match', function () {
  var reg = new ReRegExp('abc');
  expect('abc'.match(reg)).toMatchObject(eval("'abc'.match(/abc/)"));
  expect('abcabc'.match(reg)).toMatchObject(eval("'abcabc'.match(/abc/)"));
  expect('0abc0abc0'.match(reg)).toMatchObject(eval("'0abc0abc0'.match(/abc/)"));
  expect('000'.match(reg)).toBeNull();
});
test('match with globals', function () {
  var reg = new ReRegExp('abc', 'g');
  expect('abc'.match(reg)).toMatchObject(eval("'abc'.match(/abc/g)"));
  expect('abcabc'.match(reg)).toMatchObject(eval("'abcabc'.match(/abc/g)"));
  expect('0abc0abc0'.match(reg)).toMatchObject(eval("'0abc0abc0'.match(/abc/g)"));
  expect('000'.match(reg)).toBeNull();
});
test('match with captures', function () {
  var reg = new ReRegExp('a(b)(c)');
  expect('abc'.match(reg)).toMatchObject(eval("'abc'.match(/a(b)(c)/)"));
  expect('abcabc'.match(reg)).toMatchObject(eval("'abcabc'.match(/a(b)(c)/)"));
  expect('0abc0abc0'.match(reg)).toMatchObject(eval("'0abc0abc0'.match(/a(b)(c)/)"));
  expect('000'.match(reg)).toBeNull();
});
test('match with asserts', function () {
  var reg = new ReRegExp('(?<=a)bc');
  expect('abc'.match(reg)).toMatchObject(eval("'abc'.match(/(?<=a)bc/)"));
  expect('abcabc'.match(reg)).toMatchObject(eval("'abcabc'.match(/(?<=a)bc/)"));
  expect('0abc0abc0'.match(reg)).toMatchObject(eval("'0abc0abc0'.match(/(?<=a)bc/)"));
  expect('000'.match(reg)).toBeNull();
});
test('match with looped asserts', function () {
  var reg = new ReRegExp('(?<=a)bc');
  expect('abc'.match(reg)).toMatchObject(eval("'abc'.match(/(?<=a)bc/)"));
  expect('abcabc'.match(reg)).toMatchObject(eval("'abcabc'.match(/(?<=a)bc/)"));
  expect('0abc0abc0'.match(reg)).toMatchObject(eval("'0abc0abc0'.match(/(?<=a)bc/)"));
  expect('000'.match(reg)).toBeNull();
});