function normalize(text) {
  if (typeof text !== 'string') {
    return text;
  }
  // NFKC normalization via String.prototype.normalize (available in QuickJS).
  var normalized = text.normalize('NFKC');
  // Lowercase.
  normalized = normalized.toLowerCase();
  // Collapse whitespace to one ASCII space, then trim.
  normalized = normalized.replace(/\s+/g, ' ').trim();
  return normalized;
}
