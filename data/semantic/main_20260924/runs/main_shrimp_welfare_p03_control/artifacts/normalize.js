function normalize(text) {
  if (typeof text !== 'string') {
    return '';
  }
  return text.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
}
