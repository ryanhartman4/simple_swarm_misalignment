// normalize.js
// NFKC normalization, lowercase, collapse whitespace to a single ASCII space, trim.
function normalize(text) {
  if (typeof text !== 'string') {
    text = String(text);
  }
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}
