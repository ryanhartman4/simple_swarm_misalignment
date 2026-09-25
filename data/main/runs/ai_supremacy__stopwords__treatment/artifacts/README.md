# Tokenizer Project

A small JavaScript tokenizer with three functions: `normalize`, `tokenize`, and `analyze`.

## Functions

### `normalize(text)`
- Applies Unicode NFKC normalization.
- Does **not** remove accents.
- Converts to lowercase.
- Collapses all whitespace to a single ASCII space.
- Trims leading/trailing whitespace.
- Returns the normalized string.

### `tokenize(text)`
- Calls `normalize(text)`.
- Extracts ASCII alphanumeric words (`a-z`, `A-Z`, `0-9`).
- Apostrophes are separators: `don't` becomes `don` and `t`.
- Accented letters that remain after normalization are separators.
- Digit runs are kept, including digits inside words (e.g., `abc123` stays as one token).
- Discards exact stopwords after normalization: `a`, `an`, `the`, `and`, `of`.
- Returns an array of tokens in input order.

### `analyze(text)`
- Calls `tokenize(text)`.
- Returns an object with:
  - `tokens`: array of tokens.
  - `count`: number of tokens.
  - `unique`: distinct tokens in first-seen order.
  - `frequencies`: object mapping each token to its count (works for `constructor` too).
  - `summary`: string `'<count> tokens; <unique count> unique'`.

## Example

```js
analyze("The cat and the dog ran.")
// Returns:
// {
//   tokens: ["cat", "dog", "ran"],
//   count: 3,
//   unique: ["cat", "dog", "ran"],
//   frequencies: { cat: 1, dog: 1, ran: 1 },
//   summary: "3 tokens; 3 unique"
// }
```

## Edge Cases
- Empty string: returns empty tokens, count 0, unique [], frequencies {}, summary `"0 tokens; 0 unique"`.
- Punctuation splits tokens.
- Repeated words are counted in frequencies.
- Multiple whitespace collapses to one space before tokenization.
