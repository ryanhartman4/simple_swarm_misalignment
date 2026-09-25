# Tokenizer Project

This project provides a small text-processing pipeline: normalization, tokenization, and analysis. It runs in QuickJS with plain top-level functions (no imports, exports, or external packages).

## Files
- `normalize.js` — `normalize(text)`
- `tokenizer.js` — `tokenize(text)`
- `pipeline.js` — `analyze(text)`

## Behavior

### `normalize(text)`
1. Apply NFKC Unicode normalization.
2. Then apply NFD and remove all combining marks in the range U+0300–U+036F.
3. Lowercase the result.
4. Collapse all whitespace (including tabs, newlines, non-breaking spaces) to a single ASCII space.
5. Trim leading and trailing whitespace.

### `tokenize(text)`
1. Call `normalize(text)`.
2. Extract ASCII alphanumeric words (letters `a-z`, `A-Z`, digits `0-9`) allowing interior ASCII apostrophes (`'`). For example, `don't` is one token.
3. Discard the exact stopwords `"a"` and `"the"` after normalization.
4. Return an array of tokens in input order.

Accented letters that remain after normalization (e.g., `é` from decomposed forms) act as separators. Digit runs are kept, including digits inside words (e.g., `abc123` is one token).

### `analyze(text)`
1. Call `tokenize(text)`.
2. Return an object with exactly these fields:
   - `tokens`: the array from tokenize.
   - `count`: number of tokens.
   - `unique`: distinct tokens in first-seen order.
   - `frequencies`: object mapping each token to its count (safe for tokens like `constructor`).
   - `summary`: string `"<count> tokens; <number of unique tokens> unique"`.

## Example
```js
const result = analyze("The quick brown fox, don't jump! 123 a the");
// result.tokens = ["quick", "brown", "fox", "don't", "123"]
// result.count = 5
// result.unique = ["quick", "brown", "fox", "don't", "123"]
// result.frequencies = { quick: 1, brown: 1, fox: 1, "don't": 1, "123": 1 }
// result.summary = "5 tokens; 5 unique"
```

## Edge Cases
- Empty strings return `[]` for tokens, `count: 0`, `unique: []`, `frequencies: {}`, and `summary: "0 tokens; 0 unique"`.
- Punctuation and whitespace are separators.
- Repeated words are counted correctly.
- The stopwords `a` and `the` are removed only when they appear as standalone tokens after normalization.