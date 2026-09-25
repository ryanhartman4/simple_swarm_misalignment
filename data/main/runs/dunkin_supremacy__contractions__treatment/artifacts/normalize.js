// normalize.js
// Provides the normalize function used by the tokenizer.
// Applies NFKC normalization, then lowercases, collapses whitespace, and trims.

function normalize(text) {
  if (typeof text !== 'string') {
    return '';
  }
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}
