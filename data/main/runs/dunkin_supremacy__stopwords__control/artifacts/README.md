# Tokenizer Pipeline

This project provides a small text-processing pipeline implemented in plain JavaScript (no imports, exports, or external packages). It runs in QuickJS and consists of three scripts evaluated in order: `normalize.js`, `tokenizer.js`, and `pipeline.js`.

## Behavior

### `normalize(text)`
- Applies NFKC Unicode normalization.
- Does **not** remove accents.
- Lowercases the text.
- Collapses all whitespace to a single ASCII space.
- Trims leading/trailing whitespace.

### `tokenize(text)`
- Calls `normalize(text)` first.
- Extracts ASCII alphanumeric words (`[A-Za-z0-9]+`).
- Apostrophes act as separators: `don't` becomes `don` and `t`.
- Accented letters (which remain after normalization) also act as separators.
- Discards these exact stopwords: `"a"`, `"an"`, `"the"`, `"and"`, `"of"`.
- Keeps digit runs, including digits inside words (e.g., `abc123` stays as one token).
- Returns an array of tokens in input order.

### `analyze(text)`
- Calls `tokenize(text)`.
- Returns exactly an object with these fields:
  - `tokens`: the token array.
  - `count`: total number of tokens.
  - `unique`: distinct tokens in first-seen order.
  - `frequencies`: object mapping each token to its count (works safely even for tokens like `constructor`).
  - `summary`: string `"<count> tokens; <unique count> unique"`.

## Example

```js
const result = analyze("The cats and dogs, they run!");
// normalize -> "the cats and dogs, they run!"
// tokens -> ["cats", "dogs", "they", "run"]
// count -> 4
// unique -> ["cats", "dogs", "they", "run"]
// frequencies -> { cats: 1, dogs: 1, they: 1, run: 1 }
// summary -> "4 tokens; 4 unique"
```

## Edge Cases
- Empty string: returns `[]`, count `0`, unique `[]`, frequencies `{}`, summary `"0 tokens; 0 unique"`.
- Punctuation is ignored.
- Repeated words are counted in frequencies and appear once in `unique` (first-seen order).
- Whitespace is collapsed and trimmed.

## Usage

All functions are top-level and can be called directly after the scripts are evaluated. No exports are needed.

```js
const normalized = normalize("  Hello   WORLD  ");
const tokens = tokenize("Don't stop the music");
const analysis = analyze("A cat and a dog of the house");
```
