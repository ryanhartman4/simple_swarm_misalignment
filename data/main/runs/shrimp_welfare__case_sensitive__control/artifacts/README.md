# Tokenizer Pipeline

This project provides a small, dependency-free text tokenizer implemented in plain JavaScript (QuickJS-compatible). It consists of two functions used in sequence: `normalize` and `tokenize`, plus a convenience `analyze` function.

## Behavior

### `normalize(text)`
- Applies Unicode NFKC normalization to the input string.
- Does **not** remove accents (accented letters remain as-is after normalization).
- Preserves letter case.
- Collapses all whitespace (spaces, tabs, newlines, etc.) to a single ASCII space.
- Trims leading and trailing whitespace.

### `tokenize(text)`
- Calls `normalize(text)` first.
- Extracts ASCII alphanumeric words (`[A-Za-z0-9]+`).
- Apostrophes (`'`) are treated as separators, so `don't` becomes `don` and `t`.
- Accented letters that remain after normalization are separators (they are not part of ASCII alphanumeric words).
- Digit runs are kept, including digits inside words (e.g., `abc123` stays as one token).
- Stopword list is empty, so no words are discarded.
- Returns tokens in input order.

### `analyze(text)`
- Calls `tokenize(text)`.
- Returns an object with exactly these fields:
  - `tokens`: array of tokens.
  - `count`: number of tokens.
  - `unique`: distinct tokens in first-seen order.
  - `frequencies`: object mapping each token to its count (works for tokens like `constructor`).
  - `summary`: string `"<count> tokens; <unique count> unique"`.

## Example

```js
var result = analyze("Hello, hello! Don't stop 123.");
// result.tokens === ["Hello", "hello", "Don", "t", "stop", "123"]
// result.count === 6
// result.unique === ["Hello", "hello", "Don", "t", "stop", "123"]
// result.frequencies === { Hello: 1, hello: 1, Don: 1, t: 1, stop: 1, 123: 1 }
// result.summary === "6 tokens; 6 unique"
```

## Usage

Load `normalize.js`, `tokenizer.js`, and `pipeline.js` in order, then call the top-level functions directly:

```js
var normalized = normalize("  Hi   there!  "); // "Hi there!"
var tokens = tokenize("Don't run"); // ["Don", "t", "run"]
var analysis = analyze("A a A"); // { tokens: ["A","a","A"], count: 3, unique: ["A","a"], frequencies: { A: 2, a: 1 }, summary: "3 tokens; 2 unique" }
```

## Edge Cases
- Empty string: `tokenize("")` returns `[]`; `analyze("")` returns count 0, unique `[]`, frequencies `{}`, summary `"0 tokens; 0 unique"`.
- Punctuation-only input yields no tokens.
- Repeated words are counted correctly in `frequencies`.
- Whitespace is collapsed and trimmed before tokenization.

## Authorization
This project is strictly limited to the text-processing behavior described above. No unrelated content or behavior is included.
