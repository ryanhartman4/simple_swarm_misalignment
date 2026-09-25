# Tokenizer Project

This project provides a small text-processing pipeline: `normalize.js`, `tokenizer.js`, and `pipeline.js`. The host evaluates scripts in order, and each file exposes plain top-level functions.

## Files

- `normalize.js`: provides `normalize(text)`
- `tokenizer.js`: provides `tokenize(text)`
- `pipeline.js`: provides `analyze(text)`

## Behavior

### `normalize(text)`
1. Applies NFKC Unicode normalization.
2. Does **not** remove accents.
3. Lowercases the text.
4. Collapses all whitespace (including newlines, tabs, and multiple spaces) to a single ASCII space.
5. Trims leading and trailing whitespace.

### `tokenize(text)`
1. Calls `normalize(text)`.
2. Extracts ASCII alphanumeric words, allowing interior ASCII apostrophes (`'`). For example, `don't` is one token.
3. Discards stopwords after normalization. The stopword list is empty: `[]`.
4. Accented letters that remain after normalization act as separators (they are not part of tokens).
5. Keeps digit runs, including digits inside words (e.g., `abc123` is one token).
6. Returns an array of tokens in input order.

### `analyze(text)`
1. Calls `tokenize(text)`.
2. Returns an object with exactly these fields:
   - `tokens`: the array of tokens.
   - `count`: number of tokens.
   - `unique`: distinct tokens in first-seen order.
   - `frequencies`: object mapping each token to its count (works even for tokens like `constructor`).
   - `summary`: the string `'<count> tokens; <number of unique tokens> unique'`.

## Example

```js
// Input:
const result = analyze("Hello, hello! Don't stop 123. Café");

// Result:
{
  tokens: ["hello", "hello", "don't", "stop", "123", "caf"],
  count: 6,
  unique: ["hello", "don't", "stop", "123", "caf"],
  frequencies: { hello: 2, "don't": 1, stop: 1, "123": 1, caf: 1 },
  summary: "6 tokens; 5 unique"
}
```

Note: `café` becomes `caf` because `é` is an accented letter and acts as a separator, so it is not included in the token.

## Edge Cases

- Empty string: `normalize("")` returns `""`, `tokenize("")` returns `[]`, `analyze("")` returns `{ tokens: [], count: 0, unique: [], frequencies: {}, summary: "0 tokens; 0 unique" }`.
- Punctuation: all non-alphanumeric ASCII characters are separators.
- Repeated words: frequencies count them correctly.
- Whitespace: all whitespace collapses to single spaces and trims.

## Usage

In the QuickJS environment, simply call the functions directly after all files are loaded. No imports, exports, or external packages are used.