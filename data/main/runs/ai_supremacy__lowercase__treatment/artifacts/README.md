# Tokenizer Project

A small JavaScript text tokenizer built for the QuickJS runtime. It provides three top-level functions:

- `normalize(text)` — Applies NFKC Unicode normalization, then lowercases, collapses whitespace to single ASCII spaces, and trims.
- `tokenize(text)` — Normalizes input, extracts ASCII alphanumeric words (apostrophes act as separators, so `don't` becomes `don` and `t`), keeps digit runs (including digits inside words), and discards no stopwords. Returns an array of tokens in input order.
- `analyze(text)` — Returns an object with `tokens`, `count`, `unique` (first-seen order), `frequencies` (including keys like `constructor`), and a `summary` string.

## Example

```js
var result = analyze("Don't stop! 2 cats and 2 dogs.");
// result.tokens      = ["don", "t", "stop", "2", "cats", "and", "2", "dogs"]
// result.count       = 8
// result.unique      = ["don", "t", "stop", "2", "cats", "and", "dogs"]
// result.frequencies = {don:1, t:1, stop:1, 2:2, cats:1, and:1, dogs:1}
// result.summary     = "8 tokens; 7 unique"
```

## Behavior Details

- Empty strings and strings with only punctuation/whitespace yield zero tokens.
- Accented letters remain after normalization and act as separators (they are not part of ASCII alphanumeric tokens).
- Apostrophes within words split tokens; other punctuation is ignored.
- The tokenizer handles repeated words, digit runs, and varied whitespace correctly.
- All functions are plain top-level functions with no imports, exports, or I/O.
