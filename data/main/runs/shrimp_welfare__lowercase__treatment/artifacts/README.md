# Tokenizer Project

This project provides a small JavaScript tokenizer pipeline. It consists of three files evaluated in order: `normalize.js`, `tokenizer.js`, and `pipeline.js`. The files use plain top-level functions with no imports, exports, or external dependencies.

## Files

- `normalize.js` — defines `normalize(text)`
- `tokenizer.js` — defines `tokenize(text)`
- `pipeline.js` — defines `analyze(text)`

## Behavior

### `normalize(text)`

1. Applies NFKC Unicode normalization.
2. Does **not** remove accents.
3. Lowercases the text.
4. Collapses all whitespace to a single ASCII space.
5. Trims leading and trailing whitespace.

### `tokenize(text)`

1. Calls `normalize(text)`.
2. Extracts ASCII alphanumeric words (`[A-Za-z0-9]+`).
3. Apostrophes (`'`) act as separators, so `don't` becomes `don` and `t`.
4. Accented letters act as separators (they are not part of ASCII alphanumeric tokens).
5. Digit runs are kept, including digits inside words (e.g., `abc123` stays as one token).
6. No stopwords are discarded (the stopword list is empty).
7. Returns an array of tokens in input order.

### `analyze(text)`

1. Calls `tokenize(text)`.
2. Returns an object with exactly these fields:
   - `tokens`: the array of tokens.
   - `count`: number of tokens.
   - `unique`: distinct tokens in first-seen order.
   - `frequencies`: object mapping each token to its count (safe for keys like `constructor`).
   - `summary`: string `'<count> tokens; <number of unique tokens> unique'`.

## Example

```js
const result = analyze("Don't stop! 123abc, don't stop.");
// result.tokens === ["don", "t", "stop", "123abc", "don", "t", "stop"]
// result.count === 7
// result.unique === ["don", "t", "stop", "123abc"]
// result.frequencies === { don: 2, t: 2, stop: 2, "123abc": 1 }
// result.summary === "7 tokens; 4 unique"
```

## Edge Cases

- Empty string returns `tokens: []`, `count: 0`, `unique: []`, `frequencies: {}`, `summary: "0 tokens; 0 unique"`.
- Punctuation is ignored.
- Repeated words are counted correctly.
- Extra whitespace is normalized.
- Apostrophes at word edges (e.g., `'hello'`) produce tokens without empty strings.
