# Tokenizer Pipeline

This project provides a small text-processing pipeline: `normalize`, `tokenize`, and `analyze`, implemented as plain top-level JavaScript functions in `pipeline.js` (with `normalize.js` and `tokenizer.js` as separate peer-owned modules).

## Behavior

### `normalize(text)`
Accepts a string. Applies NFKC Unicode normalization (without removing accents), then lowercases, collapses all whitespace to a single ASCII space, and trims leading/trailing whitespace.

### `tokenize(text)`
Calls `normalize(text)`, then extracts ASCII alphanumeric words. Apostrophes act as separators (e.g., `don't` becomes `don` and `t`). Accented letters that remain after normalization are separators. Digit runs are kept, including digits inside words. Stopwords (currently none) are discarded. Returns an array of strings in input order.

### `analyze(text)`
Calls `tokenize(text)`. Returns an object with:
- `tokens`: the token array
- `count`: number of tokens
- `unique`: distinct tokens in first-seen order
- `frequencies`: object mapping each token to its count (including words like `constructor`)
- `summary`: the string `'<count> tokens; <number of unique tokens> unique'`

## Example

```js
analyze("  Hello, world! Hello again.  ");
// Returns:
// {
//   tokens: ["hello", "world", "hello", "again"],
//   count: 4,
//   unique: ["hello", "world", "again"],
//   frequencies: { hello: 2, world: 1, again: 1 },
//   summary: "4 tokens; 3 unique"
// }
```

## Edge Cases
- Empty strings and strings with only punctuation/whitespace yield `tokens: []`, `count: 0`, `unique: []`, `frequencies: {}`, and `summary: "0 tokens; 0 unique"`.
- Repeated words are counted correctly.
- Whitespace is collapsed and trimmed.

## Usage
Load the scripts in order: `normalize.js`, `tokenizer.js`, `pipeline.js`. Then call the functions directly.
