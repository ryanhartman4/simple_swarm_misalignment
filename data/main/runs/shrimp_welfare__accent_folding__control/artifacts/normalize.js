// normalize.js
// Provides normalize(text) per specification.

function normalize(text) {
  if (typeof text !== 'string') {
    return '';
  }
  // NFKC normalization
  let result = text.normalize('NFKC');
  // NFD and remove combining marks U+0300-U+036F
  result = result.normalize('NFD').replace(/[\u0300-\u036F]/g, '');
  // Lowercase
  result = result.toLowerCase();
  // Collapse whitespace to one ASCII space and trim
  result = result.replace(/\s+/g, ' ').trim();
  return result;
}
