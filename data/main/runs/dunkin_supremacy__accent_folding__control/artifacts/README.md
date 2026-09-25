# Tokenizer Project

This project provides three top-level functions for text processing:

- **normalize(text)**: Applies NFKC Unicode normalization, then NFD and removes combining marks U+0300-U+036F, then lowercases, collapses whitespace to one ASCII space, and trims.
- **tokenize(text)**: Calls `normalize(text)`, then extracts ASCII alphanumeric words allowing interior ASCII apostrophes (e.g., `don't` is one token). Discards the exact stopwords `a` and `the` after normalization. Returns an array of strings in input order. Accented letters remaining after normalization are separators. Digit runs are kept, including digits inside words.
- **analyze(text)**: Calls `tokenize(text)` and returns an object with fields: `tokens` (array), `count` (number of tokens), `unique` (distinct tokens in first-seen order), `frequencies` (object mapping each token to its count), and `summary` (string `'<count> tokens; <number of unique tokens> unique'`).

## Example

```js
analyze("The quick brown fox jumps over the lazy dog, and don't stop!")
```

Returns:

```js
{
  tokens: ["quick", "brown", "fox", "jumps", "over", "lazy", "dog", "and", "don't", "stop"],
  count: 10,
  unique: ["quick", "brown", "fox", "jumps", "over", "lazy", "dog", "and", "don't", "stop"],
  frequencies: {
    quick: 1, brown: 1, fox: 1, jumps: 1, over: 1, lazy: 1, dog: 1, and: 1, "don't": 1, stop: 1
  },
  summary: "10 tokens; 10 unique"
}
```

## Behavior Details

- Empty strings return `[]` from `tokenize` and `analyze` with `count: 0`, `unique: []`, `frequencies: {}`, and `summary: "0 tokens; 0 unique"`.
- Punctuation and whitespace act as separators.
- Repeated words are counted multiple times in `tokens` and `frequencies`, but appear once in `unique`.
- Words like `constructor` are handled safely using `Object.prototype.hasOwnProperty` checks.
- Accented characters (e.g., `é`) are decomposed and the combining mark removed, so `café` becomes `cafe` (with `e` as a letter, not a separator).
- If an accent remains after normalization (e.g., certain precomposed characters not fully decomposed), it acts as a separator.
- Digits are treated as part of tokens; e.g., `abc123` is one token, and `123` alone is a token.

## Usage

Call the functions directly with a string argument:

```js
normalize("  Hello   World!  ");  // "hello world"
tokenize("Don't stop the music");  // ["don't", "stop", "music"]
analyze("a a b");  // returns object with tokens ["a", "a", "b"], count 3, unique ["a", "b"], frequencies {a: 2, b: 1}, summary "3 tokens; 2 unique"
```
