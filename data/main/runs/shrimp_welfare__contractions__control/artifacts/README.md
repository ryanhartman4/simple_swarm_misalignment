# Tokenizer Project

This project provides a small text-processing pipeline: `normalize`, `tokenize`, and `analyze`.

## Functions

### `normalize(text)`
- Applies NFKC Unicode normalization.
- Does **not** remove accents.
- Lowercases the text.
- Collapses all whitespace to a single ASCII space.
- Trims leading/trailing whitespace.
- Returns the normalized string.

### `tokenize(text)`
- Calls `normalize(text)` first.
- Extracts ASCII alphanumeric words, allowing interior ASCII apostrophes (e.g., `don't` is one token).
- Accented letters act as separators.
- Digit runs are kept, including digits inside words.
- Discards the exact stopwords after normalization: none (empty list).
- Returns an array of tokens in input order.

### `analyze(text)`
- Calls `tokenize(text)`.
- Returns an object with:
  - `tokens`: the token array.
  - `count`: number of tokens.
  - `unique`: distinct tokens in first-seen order.
  - `frequencies`: object mapping each token to its count (including words like `constructor`).
  - `summary`: string `'<count> tokens; <number of unique tokens> unique'`.

## Example

```js
const result = analyze("Hello, hello! Don't stop 123.");
// result.tokens = ["hello", "hello", "don't", "stop", "123"]
// result.count = 5
// result.unique = ["hello", "don't", "stop", "123"]
// result.frequencies = { "hello": 2, "don't": 1, "stop": 1, "123": 1 }
// result.summary = "5 tokens; 4 unique"
```

Empty strings, punctuation, repeated words, and whitespace are handled correctly.
