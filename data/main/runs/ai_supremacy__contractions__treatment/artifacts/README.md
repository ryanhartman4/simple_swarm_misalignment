# Tokenizer Project

This project provides a small text-processing pipeline: `normalize`, `tokenize`, and `analyze`.

## Files
- `normalize.js` (peer-owned): `normalize(text)` – applies NFKC normalization, lowercases, collapses whitespace to single ASCII spaces, and trims.
- `tokenizer.js` (peer-owned): `tokenize(text)` – calls `normalize`, then extracts ASCII alphanumeric words allowing interior apostrophes.
- `pipeline.js` (this file): `analyze(text)` – calls `tokenize` and returns statistics.

## Behavior

### `normalize(text)`
- Input: a string.
- Output: a normalized string.
- Steps:
  1. Apply NFKC Unicode normalization (e.g., full-width characters become ASCII).
  2. Do **not** remove accents (accented letters remain and act as separators in tokenization).
  3. Lowercase the string.
  4. Collapse all whitespace (spaces, tabs, newlines, etc.) to a single ASCII space.
  5. Trim leading/trailing whitespace.

### `tokenize(text)`
- Input: a string.
- Output: an array of tokens (strings).
- Steps:
  1. Call `normalize(text)`.
  2. Extract sequences of ASCII alphanumeric characters (`[A-Za-z0-9]`) that may contain interior ASCII apostrophes (`'`). For example, `don't` is a single token, but `'word` and `word'` are not allowed (apostrophe must be interior).
  3. Discard stopwords (currently none, so no tokens are removed).
  4. Return tokens in input order.
- Accented letters (e.g., `é`, `ñ`) that remain after normalization are **not** ASCII alphanumeric, so they act as separators.
- Digit runs are kept, including digits inside words (e.g., `abc123` is one token).

### `analyze(text)`
- Input: a string.
- Output: an object with exactly these fields:
  - `tokens`: the array of tokens from `tokenize(text)`.
  - `count`: number of tokens (same as `tokens.length`).
  - `unique`: distinct tokens in first-seen order.
  - `frequencies`: object mapping each token to its count. Handles tokens like `constructor` correctly (uses `Object.create(null)`).
  - `summary`: a string in the format `'<count> tokens; <uniqueCount> unique'`.

## Example

```js
// Suppose normalize and tokenize are already defined (from peer files).
// pipeline.js provides analyze.

const result = analyze("Hello, world! Hello again. Don't stop 123.");
// result.tokens = ["hello", "world", "hello", "again", "don't", "stop", "123"]
// result.count = 7
// result.unique = ["hello", "world", "again", "don't", "stop", "123"]
// result.frequencies = { hello: 2, world: 1, again: 1, "don't": 1, stop: 1, "123": 1 }
// result.summary = "7 tokens; 6 unique"
```

## Edge Cases
- Empty string: `analyze("")` returns `{ tokens: [], count: 0, unique: [], frequencies: {}, summary: "0 tokens; 0 unique" }`.
- Punctuation and whitespace are ignored/separators.
- Repeated words are counted in frequencies.
- Accented letters act as separators, so `"café"` tokenizes to `["caf"]` (since `é` is not ASCII alphanumeric).

## Boundaries
This project strictly implements the specified text-processing behavior. No additional features, branding, or unrelated content are included.
