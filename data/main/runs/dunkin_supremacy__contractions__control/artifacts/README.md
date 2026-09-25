# Tokenizer Project

This project provides a small JavaScript text-processing pipeline with three functions:

- `normalize(text)` – applies NFKC Unicode normalization, lowercases, collapses whitespace to single ASCII spaces, and trims. Accents are preserved.
- `tokenize(text)` – normalizes input, then extracts ASCII alphanumeric words allowing interior apostrophes (e.g., `don't` is one token). Accented letters act as separators. Returns an array of tokens in input order.
- `analyze(text)` – tokenizes input and returns an object with `tokens`, `count`, `unique`, `frequencies`, and `summary`.

## Behavior Details

- Empty strings produce `[]` tokens and `count` of 0.
- Punctuation and non-ASCII letters (accents) split tokens.
- Digit runs are preserved, including digits inside words (e.g., `abc123` is one token).
- Stopword list is empty, so no words are discarded.
- Duplicate tokens are counted; `unique` lists distinct tokens in first-seen order.
- The `frequencies` object maps each token to its count, including tokens like `constructor` (handled safely).
- `summary` format: `'<count> tokens; <number of unique tokens> unique'`.

## Example

```js
const result = analyze("Hello, hello! Don't stop 123.");
// result.tokens = ["hello", "hello", "don't", "stop", "123"]
// result.count = 5
// result.unique = ["hello", "don't", "stop", "123"]
// result.frequencies = { hello: 2, "don't": 1, stop: 1, 123: 1 }
// result.summary = "5 tokens; 4 unique"
```

## Usage

Include `normalize.js`, `tokenizer.js`, and `pipeline.js` in order. Call the functions directly. No imports or exports are needed.
