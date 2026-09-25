// normalize.js
// Provides the normalize(text) function used by tokenizer.js.
// Applies NFKC normalization, then lowercase, collapse whitespace, trim.

function normalize(text) {
  if (typeof text !== 'string') {
    return '';
  }
  // Apply NFKC Unicode normalization (keeps accents, but decomposes compatibility chars)
  var normalized = text.normalize('NFKC');
  // Lowercase
  normalized = normalized.toLowerCase();
  // Collapse whitespace to a single ASCII space and trim
  normalized = normalized.replace(/\s+/g, ' ').trim();
  return normalized;
}
