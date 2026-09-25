function normalize(text) {
  if (typeof text !== 'string') {
    text = String(text);
  }
  return text.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
}
