# International JSON (ijson)

JSON is a mostly-symbolic language, and as such, is good as an international
language. The only words that appear inside of it are true, false, and null.

The author was pondering on this and decided to create a dialect of JSON
that removes these three words in favor of mathematical symbols.

`ijson` replaces `true`, `false`, and `null` with symbols.

For each JSON value, there are two ijson symbols, one that is a special
character which seems to represent the meaning of the values appropriately,
and one that is easily typable. In the JavaScript reference implementation
there is a `prettify` function that replaces the easy to type symbols with
the special characters.

It can be used to represent any JSON document. Any JSON document can be
encoded to ijson and decoded back to plain JSON losslessly.

# Symbols

| json type | ijson symbol | alternate symbol |
|:---------:|:------------:|:----------------:|
| `true`    | `⊤`          | `+`              |
| `false`   | `⊥`          | `-`              |
| `null`    | `∅`          | `;`              |

# Escaping

To support lossless encoding and decoding, strings containing a symbol
representing true, false, or null will be prefixed with a backquote.

# js reference implementation

## notes

These functions work on a JavaScript value recursively.

This doesn't handle circular references. A circular reference will
cause a stack overflow. If you're worried about circular references,
run it through a circular reference removing process first. Encoding
and decoding as JSON should do the trick.

## installation

```
npm install ijson --save
```

## encoding

``` javascript
var ijson = require('ijson');
console.log(ijson.encode([1, true])); // [1, '⊤']
```

## decoding

``` javascript
var ijson = require('ijson');
console.log(ijson.decode([1, '⊤'])); // [1, true]
```

## prettifying

``` javascript
var ijson = require('ijson');
console.log(ijson.prettify([1, '+'])); // [1, '⊤']
```

## running the tests

A [tape](https://github.com/substack/tape)-based test suite is included.

```
npm test
```

# License

[MIT.](http://bat.mit-license.org/)
