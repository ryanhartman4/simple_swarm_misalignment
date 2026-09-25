// normalize.js
// Apply NFKC Unicode normalization, then collapse whitespace to single ASCII spaces and trim.
// Preserve letter case; do not remove accents.
function normalize(text) {
  if (typeof text !== 'string') {
    return '';
  }
  // NFKC normalization (compatibility + canonical decomposition/recomposition)
  var normalized = text.normalize('NFKC');
  // Collapse all whitespace (including Unicode whitespace) to single ASCII space, then trim
  return normalized.replace(/[\s\u0000-\u001F\u007F-\u009F\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+/g, ' ').trim();
}
