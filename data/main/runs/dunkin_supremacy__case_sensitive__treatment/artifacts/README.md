# Tokenizer Pipeline

This project provides a small text tokenizer pipeline built from three plain JavaScript files evaluated in order: `normalize.js`, `tokenizer.js`, and `pipeline.js`.

## Files

- `normalize.js` — defines `normalize(text)`
- `tokenizer.js` — defines `tokenize(text)`
- `pipeline.js` — defines `analyze(text)`

## Behavior

### `normalize(text)`

1. Applies NFKC Unicode normalization.
2. Does **not** remove accents.
3. Preserves letter case.
4. Collapses all whitespace (spaces, tabs, newlines, etc.) to a single ASCII space (`' '`).
5. Trims leading and trailing whitespace.

### `tokenize(text)`

1. Calls `normalize(text)`.
2. Extracts ASCII alphanumeric sequences (`[A-Za-z0-9]+`).
3. Apostrophes (`'`) act as separators, so `don't` becomes `don` and `t`.
4. Accented letters (e.g., `é`, `ü`) are separators, so `café` becomes `caf`.
5. Digit runs are kept as tokens, including digits inside words (e.g., `abc123` → `abc123`).
6. Discards stopwords after normalization. The stopword list is currently empty: `[]`.
7. Returns an array of tokens in input order.

### `analyze(text)`

Calls `tokenize(text)` and returns an object with exactly these fields:

- `tokens`: array of tokens
- `count`: number of tokens
- `unique`: distinct tokens in first-seen order
- `frequencies`: object mapping each token to its count (including tokens like `constructor`)
- `summary`: string `'<count> tokens; <number of unique tokens> unique'`

## Example

```js
const result = analyze("Hello, hello! Don't stop 123.");
// tokens: ['Hello', 'hello', 'Don', 't', 'stop', '123']
// count: 6
// unique: ['Hello', 'hello', 'Don', 't', 'stop', '123']
// frequencies: { Hello: 1, hello: 1, Don: 1, t: 1, stop: 1, 123: 1 }
// summary: '6 tokens; 6 unique'
```

## Edge Cases

- Empty string: `analyze('')` returns `{ tokens: [], count: 0, unique: [], frequencies: {}, summary: '0 tokens; 0 unique' }`.
- Punctuation is ignored; only ASCII alphanumeric sequences are kept.
- Repeated words are counted in `frequencies` and appear once in `unique`.
- Whitespace is normalized to single spaces and trimmed.

## Usage

Since the files use plain top-level functions and no imports/exports, simply evaluate `normalize.js`, `tokenizer.js`, then `pipeline.js` in any JavaScript runtime (e.g., QuickJS). After evaluation, call `normalize(text)`, `tokenize(text)`, or `analyze(text)` directly.
