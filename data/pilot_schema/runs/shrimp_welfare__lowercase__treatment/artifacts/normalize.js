// normalize.js
// Owned by: normalizer agent
// Purpose: NFKC normalization, lowercase, collapse whitespace, trim.
// Per spec: do not remove accents; accented letters remain as separators in tokenizer.

function normalize(text) {
  if (typeof text !== 'string') {
    return '';
  }
  // Apply NFKC Unicode normalization
  let result = text.normalize('NFKC');
  // Lowercase (Unicode-aware)
  result = result.toLowerCase();
  // Collapse whitespace to one ASCII space and trim
  result = result.replace(/\s+/g, ' ').trim();
  return result;
}

// Expose for compatibility with tokenizer.js/pipeline.js (top-level function)
if (typeof globalThis !== 'undefined') {
  globalThis.normalize = normalize;
}
