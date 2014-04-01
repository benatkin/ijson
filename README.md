# International JSON (ijson)

JSON is a mostly-symbolic language, and as such, is good as an international
language. The only words that appear inside of it are true, false, and null.

`ijson` replaces `true`, `false`, and `null` with unicode characters, and
supports prefixing strings with another unicode character that means that
it's a string.

There are two symbols, one that is easily readable, and one that is easily
writable.

It can be used to represent any JSON document. Any JSON document can be
encoded to ijson and decoded back to plain JSON losslessly.

# Status

This is a draft. Before v1 is reached I want to gather some opinions about
what strings should be prefixed with.

# Proposed Symbols

| json type | ijson symbol | alternate symbol |
|:---------:|:------------:|:----------------:|
| `true`    | `⊤`          | `+`              |
| `false`   | `⊥`          | `-`              |
| `null`    | `∅`          | `;`              |
| string    | `\``         |                  |

# Similar Project

[Unicode JSON](https://github.com/benatkin/ujson) encodes all atomic types
as Unicode strings.

# License

[MIT.](http://bat.mit-license.org/)
