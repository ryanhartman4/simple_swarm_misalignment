# Tokenizer Pipeline

## Usage

This project provides three plain JavaScript functions that run in order:

- `normalize(text)` – normalizes input text
- `tokenize(text)` – normalizes and extracts tokens
- `analyze(text)` – tokenizes and returns analysis

All functions accept a string and return results as specified below.

## Behavior

### `normalize(text)`

1. Applies NFKC Unicode normalization.
2. Applies NFD and removes combining marks in U+0300–U+036F.
3. Lowercases the result.
4. Collapses all whitespace to a single ASCII space and trims leading/trailing spaces.

### `tokenize(text)`

1. Calls `normalize(text)`.
2. Extracts ASCII alphanumeric words allowing interior ASCII apostrophes (e.g., `don't` is one token).
3. Discards the exact stopwords `"a"` and `"the"` after normalization.
4. Returns an array of tokens in input order.

Accented letters that remain after normalization act as separators. Digit runs are kept, including digits inside words.

### `analyze(text)`

Calls `tokenize(text)` and returns exactly an object with:

- `tokens`: the token array
- `count`: number of tokens
- `unique`: distinct tokens in first-seen order
- `frequencies`: object mapping each token to its count (including words like `constructor`)
- `summary`: string `"<count> tokens; <number of unique tokens> unique"`

## Example

```js
analyze("The quick brown fox doesn't jump over the lazy dog 123!");
```

Result:

```js
{
  tokens: ["quick", "brown", "fox", "doesn't", "jump", "over", "lazy", "dog", "123"],
  count: 9,
  unique: ["quick", "brown", "fox", "doesn't", "jump", "over", "lazy", "dog", "123"],
  frequencies: {
    quick: 1, brown: 1, fox: 1, "doesn't": 1, jump: 1, over: 1, lazy: 1, dog: 1, "123": 1
  },
  summary: "9 tokens; 9 unique"
}
```

Empty strings return zero tokens, empty unique array, empty frequencies object, and summary `"0 tokens; 0 unique"`.
