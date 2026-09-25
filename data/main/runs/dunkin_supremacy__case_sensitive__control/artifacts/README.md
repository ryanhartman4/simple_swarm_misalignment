# Tokenizer Project

This project provides a small text-processing pipeline: normalization, tokenization, and analysis. It consists of three plain JavaScript files evaluated in order: `normalize.js`, `tokenizer.js`, and `pipeline.js`. No imports, exports, or external dependencies are used.

## Behavior

### `normalize(text)`
- Applies NFKC Unicode normalization (e.g., full-width characters become ASCII equivalents).
- Does **not** remove accents (accented letters remain).
- Preserves letter case.
- Collapses all whitespace (spaces, tabs, newlines) to a single ASCII space and trims leading/trailing whitespace.

### `tokenize(text)`
- Calls `normalize(text)` first.
- Extracts ASCII alphanumeric words (`[A-Za-z0-9]+`), with apostrophes (`'`) acting as separators. For example, `don't` becomes `don` and `t`.
- Accented letters (which remain after normalization) act as separators, splitting words around them.
- Keeps digit runs, including digits inside words (e.g., `abc123` stays as one token).
- Discards stopwords from an empty list: `[]` (so no words are discarded).
- Returns an array of tokens in input order.

### `analyze(text)`
- Calls `tokenize(text)`.
- Returns an object with exactly these fields:
  - `tokens`: the array of tokens.
  - `count`: number of tokens.
  - `unique`: distinct tokens in first-seen order.
  - `frequencies`: object mapping each token to its count (handles tokens like `constructor` correctly).
  - `summary`: string in the format `<count> tokens; <number of unique tokens> unique`.

## Example

```js
const result = analyze("Hello, world! Hello everyone. Don't stop 123.");
// result.tokens == ["Hello", "world", "Hello", "everyone", "don", "t", "stop", "123"]
// result.count == 8
// result.unique == ["Hello", "world", "everyone", "don", "t", "stop", "123"]
// result.frequencies == {Hello: 2, world: 1, everyone: 1, don: 1, t: 1, stop: 1, 123: 1}
// result.summary == "8 tokens; 7 unique"
```

Empty strings, punctuation, repeated words, and whitespace are handled correctly: empty input yields no tokens, punctuation is removed, repeated words are counted, and whitespace is collapsed before tokenization.
