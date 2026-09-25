# Tokenizer Project

A small JavaScript text tokenizer. The project consists of three files evaluated in order:

1. `normalize.js` – text normalization
2. `tokenizer.js` – tokenization
3. `pipeline.js` – analysis pipeline

## Behavior

### `normalize(text)` (in normalize.js)
- Applies NFKC Unicode normalization.
- Does **not** remove accents.
- Lowercases the text.
- Collapses whitespace to a single ASCII space.
- Trims leading/trailing whitespace.

### `tokenize(text)` (in tokenizer.js)
- Calls `normalize(text)`.
- Extracts ASCII alphanumeric words (`[A-Za-z0-9]+`).
- Apostrophes act as separators: `don't` becomes `don` and `t`.
- No stopwords are discarded (empty stopword list).
- Accented letters (after normalization) act as separators.
- Digit runs are kept, including digits inside words (e.g., `abc123` stays `abc123`).
- Returns an array of tokens in input order.

### `analyze(text)` (in pipeline.js)
- Calls `tokenize(text)`.
- Returns an object with:
  - `tokens`: array of tokens
  - `count`: number of tokens
  - `unique`: distinct tokens in first-seen order
  - `frequencies`: object mapping each token to its count (safe for keys like `constructor`)
  - `summary`: string `"<count> tokens; <number of unique tokens> unique"`

## Example

```js
analyze("Hello world, hello WORLD! don't 123abc")
// Returns:
// {
//   tokens: ["hello", "world", "hello", "world", "don", "t", "123abc"],
//   count: 7,
//   unique: ["hello", "world", "don", "t", "123abc"],
//   frequencies: { hello: 2, world: 2, don: 1, t: 1, "123abc": 1 },
//   summary: "7 tokens; 5 unique"
// }
```

## Error Handling
- Empty strings return an empty token array, `count: 0`, `unique: []`, empty frequencies, and summary `"0 tokens; 0 unique"`.
- Punctuation and whitespace are handled correctly as separators.
