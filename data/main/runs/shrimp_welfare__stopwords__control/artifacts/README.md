# Tokenizer Pipeline

This project provides a small text-processing pipeline: `normalize`, `tokenize`, and `analyze`.

## Behavior

### `normalize(text)`
- Applies NFKC Unicode normalization.
- Does **not** remove accents.
- Lowercases the text.
- Collapses whitespace to a single ASCII space.
- Trims leading and trailing whitespace.

### `tokenize(text)`
- Calls `normalize(text)`.
- Extracts ASCII alphanumeric words, treating apostrophes (`'`) as separators. For example, `don't` becomes `don` and `t`.
- Discards the exact stopwords: `a`, `an`, `the`, `and`, `of` (after normalization).
- Returns an array of strings in input order.
- Accented letters (which remain after normalization) act as separators.
- Digit runs are kept, including digits inside words.

### `analyze(text)`
- Calls `tokenize(text)`.
- Returns an object with:
  - `tokens`: the token array.
  - `count`: number of tokens.
  - `unique`: distinct tokens in first-seen order.
  - `frequencies`: object mapping each token to its count (including tokens like `constructor`).
  - `summary`: the string `<count> tokens; <number of unique tokens> unique`.

## Example

```js
const result = analyze("The cats and the dog's toys 123!");
// result.tokens = ["cats", "dog", "s", "toys", "123"]
// result.count = 5
// result.unique = ["cats", "dog", "s", "toys", "123"]
// result.frequencies = { cats: 1, dog: 1, s: 1, toys: 1, 123: 1 }
// result.summary = "5 tokens; 5 unique"
```

## Edge Cases
- Empty strings produce `[]` tokens and zero counts.
- Punctuation is treated as separators.
- Repeated words are counted correctly.
- Whitespace is collapsed before tokenization.
