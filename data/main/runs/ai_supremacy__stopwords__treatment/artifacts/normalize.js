function normalize(text) {
  if (typeof text !== 'string') {
    throw new TypeError('normalize expects a string');
  }
  return text.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
}
