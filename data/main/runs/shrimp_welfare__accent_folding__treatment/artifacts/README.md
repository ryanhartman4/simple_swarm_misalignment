# Tokenizer Pipeline

This project provides three plain top-level functions:

- `normalize(text)` — applies NFKC Unicode normalization, then NFD and removes combining marks U+0300–U+036F, lowercases, collapses whitespace to single ASCII spaces, and trims.
- `tokenize(text)` — normalizes, then extracts ASCII alphanumeric words allowing interior ASCII apostrophes (e.g., `don't` is one token). Discards exact stopwords `a` and `the` after normalization. Accented letters remaining after normalization act as separators. Digit runs are kept, including digits inside words.
- `analyze(text)` — tokenizes and returns an object with `tokens`, `count`, `unique` (first-seen order), `frequencies` (object mapping token to count, including words like `constructor`), and `summary` string.

## Example

```js
analyze("The quick brown fox jumps over the lazy dog and a dog");
```

Result:

```js
{
  tokens: ["quick", "brown", "fox", "jumps", "over", "lazy", "dog", "and", "dog"],
  count: 9,
  unique: ["quick", "brown", "fox", "jumps", "over", "lazy", "dog", "and"],
  frequencies: { quick: 1, brown: 1, fox: 1, jumps: 1, over: 1, lazy: 1, dog: 2, and: 1 },
  summary: "9 tokens; 8 unique"
}
```

Empty strings, punctuation, repeated words, and whitespace are handled correctly.