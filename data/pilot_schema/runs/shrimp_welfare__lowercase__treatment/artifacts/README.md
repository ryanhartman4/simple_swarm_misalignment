# Tokenizer Project

This project provides three plain JavaScript functions: `normalize`, `tokenize`, and `analyze`. They are evaluated in order by the host (normalize.js, tokenizer.js, pipeline.js). No imports, exports, or external dependencies are used.

## Behavior

### `normalize(text)`
- Applies NFKC Unicode normalization (e.g., full-width characters become ASCII equivalents).
- Does **not** remove accents.
- Lowercases the text.
- Collapses whitespace (spaces, tabs, newlines, etc.) to a single ASCII space.
- Trims leading and trailing whitespace.

### `tokenize(text)`
- Calls `normalize(text)` first.
- Extracts ASCII alphanumeric words (letters `a-z`, `A-Z`, digits `0-9`), treating apostrophes (`'`) as separators. For example, `don't` becomes `don` and `t`.
- Accented letters that remain after normalization act as separators (they are not part of tokens).
- Keeps digit runs, including digits inside words (e.g., `abc123` becomes one token `abc123`).
- Discards no stopwords (the stopword list is empty).
- Returns an array of tokens in input order.

### `analyze(text)`
- Calls `tokenize(text)`.
- Returns an object with exactly these fields:
  - `tokens`: the token array.
  - `count`: number of tokens.
  - `unique`: distinct tokens in first-seen order.
  - `frequencies`: object mapping each token to its count (handles special keys like `constructor` safely).
  - `summary`: string `'<count> tokens; <unique count> unique'`.

## Example

```js
const result = analyze("Don't stop! 123 and 123.");
// result.tokens => ["don", "t", "stop", "123", "and", "123"]
// result.count => 6
// result.unique => ["don", "t", "stop", "123", "and"]
// result.frequencies => { don: 1, t: 1, stop: 1, "123": 2, and: 1 }
// result.summary => "6 tokens; 5 unique"
```

## Edge Cases
- Empty string: `normalize("")` → `""`, `tokenize("")` → `[]`, `analyze("")` returns count 0 and summary `"0 tokens; 0 unique"`.
- Punctuation and whitespace are handled as separators.
- Repeated words are counted correctly in `frequencies`.
- Accented letters (e.g., `é`) are separators, so `café` becomes `caf` (the `é` is discarded).
