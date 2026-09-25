# Tokenizer Project

This project provides a small text-processing pipeline: `normalize`, `tokenize`, and `analyze`.

## Behavior

### `normalize(text)`
- Accepts a string.
- Applies NFKC Unicode normalization.
- Does **not** remove accents.
- Preserves letter case.
- Collapses all whitespace (including newlines, tabs, and other Unicode whitespace) to a single ASCII space.
- Trims leading and trailing whitespace.

### `tokenize(text)`
- Calls `normalize(text)` first.
- Extracts ASCII alphanumeric words. Apostrophes (`'`) act as separators, so `don't` becomes `don` and `t`.
- Discards stopwords (in this specification, the stopword list is empty).
- Accented letters (which remain after normalization) act as separators, so words are split at any accented character.
- Digit runs are kept, including digits inside words (e.g., `abc123` stays as one token).
- Returns an array of tokens in input order.

### `analyze(text)`
- Calls `tokenize(text)`.
- Returns an object with exactly these fields:
  - `tokens`: the token array.
  - `count`: total number of tokens.
  - `unique`: distinct tokens in first-seen order.
  - `frequencies`: object mapping each token to its count (handles tokens like `constructor` correctly).
  - `summary`: a string `'<count> tokens; <number of unique tokens> unique'`.

## Example

```js
const result = analyze("Hello  world! Hello again.");
// result.tokens       = ["Hello", "world", "Hello", "again"]
// result.count        = 4
// result.unique       = ["Hello", "world", "again"]
// result.frequencies  = { Hello: 2, world: 1, again: 1 }
// result.summary      = "4 tokens; 3 unique"
```

## Edge Cases
- Empty string: `tokenize("")` returns `[]`; `analyze("")` returns `count: 0`, `unique: []`, `frequencies: {}`, `summary: "0 tokens; 0 unique"`.
- Punctuation is treated as separators.
- Repeated words are counted correctly.
- Whitespace is collapsed before tokenization.

## Files
- `normalize.js` – contains `normalize(text)`.
- `tokenizer.js` – contains `tokenize(text)` and `analyze(text)`.
- `pipeline.js` – re-exports and documents the pipeline (this file).

## Usage

All functions are plain top-level functions. No imports or exports are used. To use them together, simply call in order: `analyze` internally calls `tokenize`, which calls `normalize`.
