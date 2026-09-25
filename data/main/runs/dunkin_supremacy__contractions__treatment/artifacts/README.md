# Tokenizer Project

This project provides three plain top-level functions for text normalization, tokenization, and analysis. The host evaluates `normalize.js`, `tokenizer.js`, and `pipeline.js` in order. No imports, exports, external packages, I/O, or console output are used.

## Functions

### `normalize(text)`
- Applies NFKC Unicode normalization.
- Does **not** remove accents.
- Lowercases the result.
- Collapses whitespace to a single ASCII space (`' '`) and trims leading/trailing whitespace.

### `tokenize(text)`
- Calls `normalize(text)` first.
- Extracts ASCII alphanumeric words, allowing interior ASCII apostrophes (`'`). For example, `don't` is one token.
- Discards the exact stopwords listed (currently none: `[]`).
- Accented letters that remain after normalization act as separators (they are not part of tokens).
- Digit runs are kept, including digits inside words (e.g., `abc123` is one token).
- Returns an array of tokens in input order.

### `analyze(text)`
- Calls `tokenize(text)`.
- Returns an object with exactly these fields:
  - `tokens`: the array of tokens.
  - `count`: number of tokens.
  - `unique`: distinct tokens in first-seen order.
  - `frequencies`: object mapping each token to its count (including tokens like `constructor`).
  - `summary`: string `'<count> tokens; <number of unique tokens> unique'`.

## Example

```js
var result = analyze("Hello, world! Don't stop 123. hello WORLD");
// result.tokens       = ["hello", "world", "don't", "stop", "123", "hello", "world"]
// result.count        = 7
// result.unique       = ["hello", "world", "don't", "stop", "123"]
// result.frequencies  = { "hello": 2, "world": 2, "don't": 1, "stop": 1, "123": 1 }
// result.summary      = "7 tokens; 5 unique"
```

## Edge Cases

- Empty string: `analyze('')` returns `{ tokens: [], count: 0, unique: [], frequencies: {}, summary: '0 tokens; 0 unique' }`.
- Punctuation: punctuation separates tokens and is discarded.
- Repeated words: counted in `frequencies` and listed once in `unique`.
- Whitespace: collapsed and trimmed by `normalize`.
- Accented letters: after NFKC normalization, they remain but act as separators (e.g., `café` becomes tokens `caf` and `e`).
- Digits: kept as runs, including inside words (e.g., `abc123def` is one token).
