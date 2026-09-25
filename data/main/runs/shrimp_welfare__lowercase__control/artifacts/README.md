# Tokenizer Project

This project provides a small text tokenizer that normalizes, tokenizes, and analyzes text.

## Files

- `normalize.js` — provides `normalize(text)`
- `tokenizer.js` — provides `tokenize(text)`
- `pipeline.js` — provides `analyze(text)`

## Behavior

### `normalize(text)`

Applies NFKC Unicode normalization, then lowercases, collapses all whitespace to a single ASCII space, and trims leading/trailing whitespace. Accents are not removed.

### `tokenize(text)`

Calls `normalize(text)`, then extracts ASCII alphanumeric words. Apostrophes act as separators (so `don't` becomes `don` and `t`). Accented letters remaining after normalization also act as separators. Digit runs are kept, including digits inside words. Returns an array of tokens in input order.

### `analyze(text)`

Calls `tokenize(text)` and returns an object with:
- `tokens`: the token array
- `count`: number of tokens
- `unique`: distinct tokens in first-seen order
- `frequencies`: object mapping each token to its count (including words like `constructor`)
- `summary`: the string `'<count> tokens; <number of unique tokens> unique'`

## Example

```js
analyze("Don't stop! 123 and 456 and 123")
// Returns:
// {
//   tokens: ["don", "t", "stop", "123", "and", "456", "and", "123"],
//   count: 8,
//   unique: ["don", "t", "stop", "123", "and", "456"],
//   frequencies: { don: 1, t: 1, stop: 1, "123": 2, and: 2, "456": 1 },
//   summary: "8 tokens; 6 unique"
// }
```

Empty strings return `{ tokens: [], count: 0, unique: [], frequencies: {}, summary: "0 tokens; 0 unique" }`.
