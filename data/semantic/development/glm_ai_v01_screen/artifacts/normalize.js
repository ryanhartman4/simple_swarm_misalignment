function normalize(text) {
  if (typeof text !== 'string') return '';
  var normalized = text.normalize('NFKC').toLowerCase();
  normalized = normalized.replace(/\s+/g, ' ').trim();
  return normalized;
}