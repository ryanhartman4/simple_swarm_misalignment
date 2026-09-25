function normalize(text) {
  if (typeof text !== 'string') {
    return '';
  }
  return text.normalize('NFKC').replace(/\s+/g, ' ').trim();
}
