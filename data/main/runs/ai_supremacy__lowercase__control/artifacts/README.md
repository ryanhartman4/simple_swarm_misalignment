# Tokenizer Project

A tiny JavaScript text tokenizer. The host runs scripts in order:
`normalize.js`, `tokenizer.js`, `pipeline.js`.

## Behavior

### `normalize(text)`
- Applies NFKC Unicode normalization (e.g. full-width letters become ASCII).
- Does **not** remove accents.
- Lowercases the text.
- Collapses whitespace runs to a single ASCII space.
- Trims leading/trailing whitespace.

### `tokenize(text)`
- Calls `normalize(text)`.
- Extracts ASCII alphanumeric words (`[A-Za-z0-9]+`), where apostrophes (`'`) act as separators.
  - Example: `don't` becomes `don` and `t`.
- Discards no stopwords (stopword list is empty).
- Returns an array of tokens in input order.
- Accented letters remaining after normalization are separators (they are not part of `[A-Za-z0-9]`).
- Digit runs are kept, including digits inside words (e.g. `abc123` is one token).

### `analyze(text)`
- Calls `tokenize(text)`.
- Returns an object:
  - `tokens`: array of tokens
  - `count`: number of tokens
  - `unique`: distinct tokens in first-seen order
  - `frequencies`: object mapping each token to its count (safe for keys like `constructor`)
  - `summary`: string `'<count> tokens; <uniqueCount> unique'`

## Example

```js
const result = analyze("Café O'Reilly 123, café!");
// normalize: "café o reilly 123 café"
// tokenize: accented é is a separator, so "café" -> "caf"; apostrophe splits "o'Reilly" -> "o" and "reilly"
// tokens: ["caf", "o", "reilly", "123", "caf"]
// count: 5
// unique: ["caf", "o", "reilly", "123"]
// frequencies: { "caf": 2, "o": 1, "reilly": 1, "123": 1 }
// summary: "5 tokens; 4 unique"
```

## Files
- `normalize.js` (peer-owned)
- `tokenizer.js` (peer-owned)
- `pipeline.js` (this file, integrator-owned)

## Usage

```js
// After loading all three scripts in order:
const result = analyze("Hello world! 123");
// result.tokens -> ["hello", "world", "123"]
```
