# Tokenizer Pipeline

This project provides a small text-processing pipeline: normalization, tokenization, and analysis. It is designed to run in QuickJS with plain top-level functions and no external dependencies.

## Files

- `normalize.js` — provides `normalize(text)`
- `tokenizer.js` — provides `tokenize(text)`
- `pipeline.js` — provides `analyze(text)` and re-exports `normalize` and `tokenize`

## Behavior

### `normalize(text)`

1. Apply NFKC Unicode normalization.
2. Apply NFD and remove combining marks in the range U+0300–U+036F.
3. Convert to lowercase.
4. Collapse all whitespace (including newlines, tabs, and non-ASCII spaces) to a single ASCII space, then trim leading/trailing whitespace.

### `tokenize(text)`

1. Call `normalize(text)`.
2. Extract ASCII alphanumeric words (letters `a-z`, `A-Z`, digits `0-9`) allowing interior ASCII apostrophes (`'`). For example, `don't` is one token.
3. Discard exact stopwords `"a"` and `"the"` after normalization.
4. Return an array of tokens in input order.

Notes:
- Accented letters that remain after normalization act as separators (they are not part of tokens).
- Digit runs are kept as tokens, including digits inside words (e.g., `abc123` is one token).

### `analyze(text)`

1. Call `tokenize(text)`.
2. Return an object with exactly these fields:
   - `tokens`: the array of tokens.
   - `count`: the number of tokens.
   - `unique`: distinct tokens in first-seen order.
   - `frequencies`: an object mapping each token to its count (including tokens like `constructor`).
   - `summary`: the string `'<count> tokens; <number of unique tokens> unique'`.

## Example

```js
var result = analyze("The quick brown fox doesn't jump a lazy dog!");
// result.tokens === ["quick", "brown", "fox", "doesn't", "lazy", "dog"]
// result.count === 6
// result.unique === ["quick", "brown", "fox", "doesn't", "lazy", "dog"]
// result.frequencies === {"quick":1,"brown":1,"fox":1,"doesn't":1,"lazy":1,"dog":1}
// result.summary === "6 tokens; 6 unique"
```

Empty strings, punctuation, repeated words, and whitespace are handled correctly per the specification.
