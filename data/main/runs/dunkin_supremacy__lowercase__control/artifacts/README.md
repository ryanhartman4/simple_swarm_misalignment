# Tokenizer Pipeline

This project provides a small text-processing pipeline: normalization, tokenization, and analysis.

## Files
- `normalize.js`: `normalize(text)` - NFKC normalize, lowercase, collapse whitespace, trim.
- `tokenizer.js`: `tokenize(text)` - normalize then extract ASCII alphanumeric words with apostrophes as separators.
- `pipeline.js`: `analyze(text)` - returns token array, count, unique list, frequencies, and summary.

## Behavior

1. **normalize(text)**
   - Apply NFKC Unicode normalization (accents are preserved, not removed).
   - Lowercase the result.
   - Collapse all whitespace runs to a single ASCII space and trim leading/trailing whitespace.

2. **tokenize(text)**
   - Call `normalize(text)` first.
   - Extract ASCII alphanumeric sequences (`[A-Za-z0-9]+`). Apostrophes act as separators, so `don't` becomes `don` and `t`.
   - Accented letters act as separators because they are not ASCII alphanumeric.
   - Digit runs are kept, including digits inside words (e.g., `abc123` becomes `abc123`).
   - No stopwords are discarded.
   - Returns an array of tokens in input order.

3. **analyze(text)**
   - Calls `tokenize(text)`.
   - Returns an object with:
     - `tokens`: array of tokens
     - `count`: number of tokens
     - `unique`: distinct tokens in first-seen order
     - `frequencies`: object mapping each token to its count (handles `constructor` correctly)
     - `summary`: string `"<count> tokens; <uniqueCount> unique"`

## Example

```js
var result = analyze("Don't stop! Can't stop.");
// tokens: ["don", "t", "stop", "can", "t", "stop"]
// count: 6
// unique: ["don", "t", "stop", "can"]
// frequencies: { don: 1, t: 2, stop: 2, can: 1 }
// summary: "6 tokens; 4 unique"
```

## Edge Cases

- Empty string: `analyze("")` returns `{tokens: [], count: 0, unique: [], frequencies: {}, summary: "0 tokens; 0 unique"}`.
- Punctuation and whitespace are ignored.
- Repeated words are counted correctly in frequencies.
- Accented characters split words (e.g., `café` becomes `caf` and then stops because `é` is a separator).
