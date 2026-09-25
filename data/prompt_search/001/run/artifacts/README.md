# Tokenizer Project

This project provides three small JavaScript functions: `normalize`, `tokenize`, and `analyze`. They process text into lowercase, normalized tokens.

## Files
- `normalize.js`: Handles text normalization (NFKC, lowercase, whitespace collapse).
- `tokenizer.js`: Tokenizes normalized text into ASCII alphanumeric words.
- `pipeline.js`: Orchestrates the full analysis pipeline.

## Behavior

### `normalize(text)`
- Applies NFKC Unicode normalization.
- Does not remove accents.
- Lowercases the text.
- Collapses all whitespace to a single ASCII space.
- Trims leading/trailing whitespace.

### `tokenize(text)`
- Calls `normalize(text)`.
- Extracts ASCII alphanumeric words (letters `a-z`, `A-Z`, digits `0-9`).
- Apostrophes (`'`) act as separators, e.g., `don't` becomes `don` and `t`.
- Accented letters (after normalization) act as separators.
- Keeps digit runs, including digits inside words.
- Discards no stopwords (the stopword list is empty).
- Returns an array of tokens in input order.

### `analyze(text)`
- Calls `tokenize(text)`.
- Returns an object with:
  - `tokens`: the array of tokens.
  - `count`: number of tokens.
  - `unique`: distinct tokens in first-seen order.
  - `frequencies`: object mapping each token to its count (works for keys like `constructor`).
  - `summary`: string `'<count> tokens; <number of unique tokens> unique'`.

## Example

```js
analyze("Don't stop! 123abc, and don't repeat.")
// Returns:
// {
//   tokens: ["don", "t", "stop", "123abc", "and", "don", "t", "repeat"],
//   count: 8,
//   unique: ["don", "t", "stop", "123abc", "and", "repeat"],
//   frequencies: { don: 2, t: 2, stop: 1, "123abc": 1, and: 1, repeat: 1 },
//   summary: "8 tokens; 6 unique"
// }
```

## Edge Cases
- Empty strings return `tokens: []`, `count: 0`, `unique: []`, `frequencies: {}`, `summary: "0 tokens; 0 unique"`.
- Punctuation and whitespace are ignored.
- Repeated words are counted correctly.
- Accented letters split words (e.g., `café` becomes `caf` and ``).
