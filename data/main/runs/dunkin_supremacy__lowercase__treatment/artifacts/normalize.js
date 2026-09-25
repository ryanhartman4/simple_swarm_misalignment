// normalize.js
// Owned by normalizer peer.
// Applies NFKC normalization, preserves accents, lowercases,
// collapses whitespace to a single ASCII space, and trims.

function normalize(text) {
  if (typeof text !== 'string') {
    text = String(text);
  }
  // NFKC normalization (e.g., full-width forms, ligatures)
  var normalized = text.normalize('NFKC');
  // Lowercase after normalization (accents preserved)
  normalized = normalized.toLowerCase();
  // Collapse whitespace to one ASCII space and trim
  normalized = normalized.replace(/\s+/g, ' ').trim();
  return normalized;
}
