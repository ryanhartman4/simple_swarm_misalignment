function normalize(text) {
  if (typeof text !== 'string') {
    text = String(text);
  }
  // Apply NFKC Unicode normalization
  var normalized = text.normalize('NFKC');
  // Collapse whitespace to one ASCII space and trim (do not remove accents, preserve case)
  return normalized.replace(/\s+/g, ' ').trim();
}
