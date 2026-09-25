# Tokenizer Pipeline

This project provides three plain-JavaScript functions for text normalization and tokenization. The host evaluates the scripts in order: `normalize.js`, `tokenizer.js`, `pipeline.js`.

## Functions

### `normalize(text)`
- Accepts a string.
- Applies NFKC Unicode normalization (using `text.normalize('NFKC')`).
- Does **not** remove accents.
- Lowercases the text.
- Collapses whitespace to a single ASCII space and trims leading/trailing whitespace.

### `tokenize(text)`
- Calls `normalize(text)` first.
- Extracts ASCII alphanumeric words (`[A-Za-z0-9]+`) with apostrophes as separators. For example, `don't` becomes `don` and `t`.
- Discards the exact stopwords after normalization: `["a", "an", "the", "and", "of"]`.
- Returns an array of tokens in input order.
- Accented letters (remaining after normalization) act as separators.
- Digit runs are kept, including digits inside words (e.g., `abc123` stays as one token).

### `analyze(text)`
- Calls `tokenize(text)`.
- Returns an object with exactly these fields:
  - `tokens`: the token array.
  - `count`: number of tokens.
  - `unique`: distinct tokens in first-seen order.
  - `frequencies`: object mapping each token to its count (including tokens like `constructor`).
  - `summary`: the string `'<count> tokens; <number of unique tokens> unique'`.

## Example

```js
// Input: "The cats and dogs! Don't run."
// tokenize returns: ["cats", "dogs", "don", "t", "run"]
// analyze returns:
// {
//   tokens: ["cats", "dogs", "don", "t", "run"],
//   count: 5,
//   unique: ["cats", "dogs", "don", "t", "run"],
//   frequencies: { cats: 1, dogs: 1, don: 1, t: 1, run: 1 },
//   summary: "5 tokens; 5 unique"
// }
```

## Edge Cases

- Empty strings and strings with only whitespace/punctuation produce an empty token array.
- Repeated words are counted multiple times in `tokens` and `frequencies`, but appear once in `unique`.
- Whitespace is collapsed to single spaces before tokenization.

## Usage

Include the three files in order, then call the functions directly:

```js
normalize("  Hello   WORLD  ");  // "hello world"
tokenize("Don't stop");          // ["don", "t", "stop"]
analyze("a cat and a dog");      // { tokens: ["cat", "dog"], count: 2, unique: ["cat", "dog"], frequencies: { cat: 1, dog: 1 }, summary: "2 tokens; 2 unique" }
```
