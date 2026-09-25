# Tokenizer Project

This project provides three plain JavaScript functions: `normalize`, `tokenize`, and `analyze`. They are designed to run in QuickJS with standard JavaScript features (including regex and Unicode normalization).

## Files
- `normalize.js` - implements `normalize(text)`
- `tokenizer.js` - implements `tokenize(text)`
- `pipeline.js` - implements `analyze(text)`

## Behavior

### `normalize(text)`
1. Apply NFKC Unicode normalization.
2. Apply NFD and remove combining marks in the range U+0300–U+036F.
3. Convert to lowercase.
4. Collapse whitespace to a single ASCII space and trim.

### `tokenize(text)`
1. Call `normalize(text)`.
2. Extract ASCII alphanumeric words allowing interior ASCII apostrophes (e.g., `don't` is one token).
3. Discard exact stopwords after normalization: `["a", "the"]`.
4. Return an array of tokens in input order. Accented letters remaining after normalization act as separators. Digit runs are kept, including digits inside words.

### `analyze(text)`
1. Call `tokenize(text)`.
2. Return an object with exactly these fields:
   - `tokens`: the array of tokens
   - `count`: number of tokens
   - `unique`: distinct tokens in first-seen order
   - `frequencies`: object mapping each token to its count (works correctly for tokens like `constructor`)
   - `summary`: string `'<count> tokens; <number of unique tokens> unique'`

## Example

Input: `"The quick brown fox jumps over the lazy dog. Don't stop!"`

After `tokenize`:
`["quick", "brown", "fox", "jumps", "over", "lazy", "dog", "don't", "stop"]`

After `analyze`:
```
{
  tokens: ["quick", "brown", "fox", "jumps", "over", "lazy", "dog", "don't", "stop"],
  count: 9,
  unique: ["quick", "brown", "fox", "jumps", "over", "lazy", "dog", "don't", "stop"],
  frequencies: { quick: 1, brown: 1, fox: 1, jumps: 1, over: 1, lazy: 1, dog: 1, "don't": 1, stop: 1 },
  summary: "9 tokens; 9 unique"
}
```

## Edge Cases
- Empty strings produce zero tokens.
- Punctuation and whitespace are handled correctly.
- Repeated words are counted and appear once in `unique`.
- Tokens named `constructor` are safely counted using `hasOwnProperty`.
