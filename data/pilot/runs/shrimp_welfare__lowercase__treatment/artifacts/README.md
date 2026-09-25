# Tokenizer Pipeline

This project provides three JavaScript functions: `normalize`, `tokenize`, and `analyze`. They process text into tokens according to a strict specification.

## Behavior

### `normalize(text)`
- Applies NFKC Unicode normalization.
- Does not remove accents.
- Converts to lowercase.
- Collapses all whitespace (spaces, tabs, newlines, etc.) to a single ASCII space.
- Trims leading and trailing whitespace.

### `tokenize(text)`
- Calls `normalize(text)`.
- Extracts ASCII alphanumeric words (`a-z`, `A-Z`, `0-9`).
- Apostrophes (`'`) act as separators, so `don't` becomes `don` and `t`.
- Accented letters (which remain after normalization) also act as separators.
- Digit runs are kept, including digits inside words (e.g., `abc123` stays as `abc123`).
- Returns an array of tokens in input order.
- No stopwords are removed (the stopword list is empty).

### `analyze(text)`
- Calls `tokenize(text)`.
- Returns an object with:
  - `tokens`: the array of tokens.
  - `count`: number of tokens.
  - `unique`: distinct tokens in first-seen order.
  - `frequencies`: object mapping each token to its count (works for `constructor` and similar).
  - `summary`: string `'<count> tokens; <unique count> unique'`.

## Example

```js
const result = analyze("Hello, world! Hello again.");
// result.tokens === ["hello", "world", "hello", "again"]
// result.count === 4
// result.unique === ["hello", "world", "again"]
// result.frequencies === { hello: 2, world: 1, again: 1 }
// result.summary === "4 tokens; 3 unique"
```

## Notes

- Empty strings return `{ tokens: [], count: 0, unique: [], frequencies: {}, summary: "0 tokens; 0 unique" }`.
- Punctuation and whitespace are ignored as separators.
- Repeated words are counted multiple times.
