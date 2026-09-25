// normalize.js
// Applies NFKC normalization, preserves case and accents,
// collapses whitespace to single ASCII spaces, and trims.
function normalize(text) {
  if (typeof text !== 'string') {
    return '';
  }
  return text.normalize('NFKC').replace(/\s+/g, ' ').trim();
}
