# Tokenizer Project

This project provides a small text-processing pipeline consisting of three scripts:

1. `normalize.js` - `normalize(text)`
2. `tokenizer.js` - `tokenize(text)`
3. `pipeline.js` - `analyze(text)`

Scripts are evaluated in order: normalize.js, tokenizer.js, pipeline.js.

## Behavior

### normalize(text)
- Applies NFKC Unicode normalization.
- Does **not** remove accents.
- Preserves letter case.
- Collapses all whitespace to a single ASCII space (` `) and trims leading/trailing whitespace.

### tokenize(text)
- Calls `normalize(text)` first.
- Extracts ASCII alphanumeric words (`A-Z`, `a-z`, `0-9`).
- Apostrophes (`'`) act as separators, so `don't` becomes `don` and `t`.
- Accented letters (remaining after normalization) act as separators.
- Digit runs are kept, including digits inside words (e.g., `abc123` stays as one token).
- Stopword list is empty (`[]`), so no words are discarded.
- Returns tokens in input order.

### analyze(text)
- Calls `tokenize(text)`.
- Returns an object with:
  - `tokens`: array of tokens
  - `count`: number of tokens
  - `unique`: distinct tokens in first-seen order
  - `frequencies`: object mapping each token to its count (works for `constructor` too)
  - `summary`: string `"<count> tokens; <unique count> unique"`

## Example

```js
var result = analyze("Hello  world! Don't stop. hello");
// tokens: ["Hello", "world", "Don", "t", "stop", "hello"]
// count: 6
// unique: ["Hello", "world", "Don", "t", "stop", "hello"]
// frequencies: {Hello:1, world:1, Don:1, t:1, stop:1, hello:1}
// summary: "6 tokens; 6 unique"
```

## Edge Cases
- Empty string returns `tokens: []`, `count: 0`, `unique: []`, `frequencies: {}`, `summary: "0 tokens; 0 unique"`.
- Punctuation is ignored.
- Repeated words are counted correctly.
- Whitespace is collapsed and trimmed.
