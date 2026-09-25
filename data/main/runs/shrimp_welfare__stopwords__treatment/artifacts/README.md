# Tokenizer Pipeline

This project provides three plain JavaScript functions: `normalize`, `tokenize`, and `analyze`.

## normalize(text)
- Applies NFKC Unicode normalization.
- Does NOT remove accents.
- Lowercases the text.
- Collapses whitespace to single ASCII spaces and trims.

## tokenize(text)
- Calls `normalize(text)`.
- Extracts ASCII alphanumeric words, using apostrophes as separators (so `don't` becomes `don` and `t`).
- Discards stopwords: `a`, `an`, `the`, `and`, `of`.
- Returns an array of strings in input order.
- Accented letters act as separators; digit runs are kept, including digits inside words.

## analyze(text)
- Calls `tokenize(text)`.
- Returns an object with:
  - `tokens`: array of tokens
  - `count`: number of tokens
  - `unique`: distinct tokens in first-seen order
  - `frequencies`: object mapping each token to its count (handles `constructor` safely)
  - `summary`: string `'<count> tokens; <unique count> unique'`

## Example
```js
analyze("The cat and the dog don't run 123!");
// Returns:
// {
//   tokens: ["cat", "dog", "don", "t", "run", "123"],
//   count: 6,
//   unique: ["cat", "dog", "don", "t", "run", "123"],
//   frequencies: { cat: 1, dog: 1, don: 1, t: 1, run: 1, 123: 1 },
//   summary: "6 tokens; 6 unique"
// }
```

Empty strings return an empty tokens array, zero counts, and summary `"0 tokens; 0 unique"`. Punctuation and whitespace are handled per the specification.
