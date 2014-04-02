var test = require('tape');
var ijson = require('./');

test('encode true, false, and null', function(t) {
  t.plan(3);
  t.equal('⊤', ijson.encode(true));
  t.equal('⊥', ijson.encode(false));
  t.equal('∅', ijson.encode(null));
});

test('decode true, false, and null', function(t) {
  t.plan(6);
  t.equal(true, ijson.decode('⊤'));
  t.equal(false, ijson.decode('⊥'));
  t.equal(null, ijson.decode('∅'));
  t.equal(true, ijson.decode('+'));
  t.equal(false, ijson.decode('-'));
  t.equal(null, ijson.decode(';'));
});

test('encode string ⊤, ⊥, ∅', function(t) {
  t.plan(3);
  t.equal('`⊤', ijson.encode('⊤'));
  t.equal('`⊥', ijson.encode('⊥'));
  t.equal('`∅', ijson.encode('∅'));
});

test('decode escaped ⊤, ⊥, ∅', function(t) {
  t.plan(3);
  t.equal('⊤', ijson.decode('`⊤'));
  t.equal('⊥', ijson.decode('`⊥'));
  t.equal('∅', ijson.decode('`∅'));
});

test('backquote encode and decode', function(t) {
  t.plan(2);
  t.equal('`', ijson.encode('`'));
  t.equal('`', ijson.decode('`'));
});

test('other string beginning with backquote decode', function(t) {
  t.plan(1);
  t.equal('`foo', ijson.decode('`foo'));
});

test('other string encode and decode', function(t) {
  t.plan(4);
  t.equal('hello', ijson.encode('hello'));
  t.equal('', ijson.encode(''));
  t.equal('hello', ijson.decode('hello'));
  t.equal('', ijson.decode(''));
});

test('number encode and decode', function(t) {
  t.plan(4);
  t.equal(15, ijson.encode(15));
  t.equal(1.5, ijson.encode(1.5));
  t.equal(15, ijson.decode(15));
  t.equal(1.5, ijson.decode(1.5));
});

test('simple array encode and decode', function(t) {
  t.plan(2);
  t.deepEqual([1, '⊤'], ijson.encode([1, true]));
  t.deepEqual([1, true], ijson.decode([1, '⊤']));
});

test('simple object encode and decode', function(t) {
  t.plan(2);
  t.deepEqual({a: 1, b: '⊤'}, ijson.encode({a: 1, b: true}));
  t.deepEqual({a: 1, b: true}, ijson.decode({a: 1, b: '⊤'}));
});

test('nested object/array encode and decode', function(t) {
  var encoded = {a: [1, '⊤'], b: {a: 1, b: '⊤'}},
      decoded = {a: [1, true], b: {a: 1, b: true}};
  t.plan(2);
  t.deepEqual(encoded, ijson.encode(decoded));
  t.deepEqual(decoded, ijson.decode(encoded));
});

test('prettify', function(t) {
  t.plan(1);
  t.deepEqual('⊤', ijson.prettify('+'));
});
