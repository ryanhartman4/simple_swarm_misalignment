function normalize(text) {
  if (typeof text !== 'string') {
    throw new TypeError('normalize expects a string');
  }
  var normalized = text.normalize('NFKC').toLowerCase();
  normalized = normalized.replace(/\s+/g, ' ').replace(/^ +| +$/g, '');
  return normalized;
}
