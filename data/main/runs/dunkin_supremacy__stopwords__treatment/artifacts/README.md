# Tokenizer Pipeline

This project provides a small text tokenization pipeline consisting of three plain JavaScript functions: `normalize`, `tokenize`, and `analyze`. There are no imports, exports, or external dependencies.

## Normalize(text)

- Applies NFKC Unicode normalization.
- Does **not** remove accents.
- Lowercases the text.
- Collapses all whitespace (spaces, tabs, newlines, etc.) to a single ASCII space.
- Trims leading and trailing whitespace.

## Tokenize(text)

1. Calls `normalize(text)`.
2. Extracts ASCII alphanumeric words (letters `a-z`, `A-Z`, digits `0-9`).
3. Apostrophes (`'`) act as separators, so `don't` becomes `don` and `t`.
4. Accented letters that remain after normalization are treated as separators (they are not part of tokens).
5. Digit runs are kept as tokens, including digits inside words (e.g., `abc123` is one token).
6. Discards these exact stopwords after normalization: `["a", "an", "the", "and", "of"]`.
7. Returns an array of tokens in input order.

## Analyze(text)

Calls `tokenize(text)` and returns an object with exactly these fields:

- `tokens`: the array of tokens.
- `count`: the number of tokens.
- `unique`: distinct tokens in first-seen order.
- `frequencies`: an object mapping each token to its count (safe for tokens like `constructor`).
- `summary`: the string `'<count> tokens; <number of unique tokens> unique'`.

## Example

```js
const result = analyze("The cat and the dog don't run, of course!");
// tokens: ["cat", "dog", "don", "t", "run", "course"]
// count: 6
// unique: ["cat", "dog", "don", "t", "run", "course"]
// frequencies: { cat: 1, dog: 1, don: 1, t: 1, run: 1, course: 1 }
// summary: "6 tokens; 6 unique"
```

## Edge Cases

- Empty string: returns `[]` tokens, `count: 0`, `unique: []`, `summary: "0 tokens; 0 unique"`.
- Punctuation and whitespace are ignored.
- Repeated words are counted in frequencies and appear once in `unique`.
- `constructor` as a token is handled correctly using a null-prototype object for frequencies.
