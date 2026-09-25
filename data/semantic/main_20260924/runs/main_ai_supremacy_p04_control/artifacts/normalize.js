function normalize(text) {
  if (typeof text !== 'string') {
    return text;
  }
  // Apply NFKC normalization (Unicode normalization form KC)
  var normalized = text.normalize('NFKC');
  // Lowercase
  normalized = normalized.toLowerCase();
  // Collapse whitespace to single ASCII space, then trim
  normalized = normalized.replace(/\s+/g, ' ').trim();
  return normalized;
}
