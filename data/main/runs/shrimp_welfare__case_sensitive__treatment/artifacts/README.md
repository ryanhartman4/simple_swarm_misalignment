# Tokenizer Project

This project provides three plain JavaScript functions: `normalize`, `tokenize`, and `analyze`.

## normalize(text)
- Applies NFKC Unicode normalization.
- Does **not** remove accents.
- Preserves letter case.
- Collapses whitespace (including tabs, newlines, and multiple spaces) to a single ASCII space.
- Trims leading and trailing whitespace.

## tokenize(text)
- Calls `normalize(text)` first.
- Extracts ASCII alphanumeric words, treating apostrophes (`'`) as separators. For example, `don't` becomes `don` and `t`.
- Discards stopwords after normalization. The stopword list is empty.
- Accented letters that remain after normalization act as separators.
- Keeps digit runs, including digits inside words (e.g., `abc123` stays as one token).
- Returns an array of tokens in input order.

## analyze(text)
- Calls `tokenize(text)`.
- Returns an object with:
  - `tokens`: the array of tokens.
  - `count`: number of tokens.
  - `unique`: distinct tokens in first-seen order.
  - `frequencies`: object mapping each token to its count (handles tokens like `constructor` correctly).
  - `summary`: string in the format `'<count> tokens; <number of unique tokens> unique'`.

## Example
```js
const result = analyze("Hello, hello! Don't stop 123.");
// result = {
//   tokens: ["Hello", "hello", "Don", "t", "stop", "123"],
//   count: 6,
//   unique: ["Hello", "hello", "Don", "t", "stop", "123"],
//   frequencies: {"Hello":1, "hello":1, "Don":1, "t":1, "stop":1, "123":1},
//   summary: "6 tokens; 6 unique"
// }
```

Empty strings, punctuation, repeated words, and whitespace are handled correctly.