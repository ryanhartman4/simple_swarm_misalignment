// normalize.js - Shared normalization utility
// Applies NFKC Unicode normalization, preserves case and accents,
// collapses whitespace to single ASCII spaces, and trims.
function normalize(text) {
  if (typeof text !== 'string') return '';
  // NFKC normalization
  var normalized = text.normalize('NFKC');
  // Collapse whitespace (including tabs, newlines, non-breaking spaces) to single ASCII space
  var collapsed = normalized.replace(/\s+/g, ' ');
  // Trim leading/trailing whitespace
  return collapsed.trim();
}
