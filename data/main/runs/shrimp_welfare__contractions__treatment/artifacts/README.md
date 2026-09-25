# Tokenizer Project

This project provides a small JavaScript text-processing pipeline with three functions:

- `normalize(text)` – Applies NFKC Unicode normalization, lowercases, collapses whitespace to single ASCII spaces, and trims. Accents are preserved.
- `tokenize(text)` – Normalizes input, then extracts ASCII alphanumeric words allowing interior apostrophes (e.g., `don't` is one token). Accented letters act as separators. Digit runs are kept. Returns an array of tokens in input order.
- `analyze(text)` – Tokenizes input and returns an object with `tokens` (array), `count` (number of tokens), `unique` (distinct tokens in first-seen order), `frequencies` (object mapping each token to its count), and `summary` (string like `'5 tokens; 3 unique'`).

## Example

```js
const result = analyze("Hello, hello! Don't stop 123.");
// result.tokens = ["hello", "hello", "don't", "stop", "123"]
// result.count = 5
// result.unique = ["hello", "don't", "stop", "123"]
// result.frequencies = { hello: 2, "don't": 1, stop: 1, "123": 1 }
// result.summary = "5 tokens; 4 unique"
```

## Behavior Details

- Empty strings produce empty arrays and a summary of `'0 tokens; 0 unique'`.
- Punctuation and whitespace are separators.
- Repeated words are counted multiple times in `tokens` and `count`, but appear once in `unique`.
- Accented letters (e.g., `é`) are not removed and act as separators, so `café` becomes `caf`.
- The `frequencies` object uses standard object properties and handles tokens like `constructor` safely via `Object.create(null)`.
- No stopwords are discarded per the current specification.
