function normalize(text) {
  if (typeof text !== 'string') return text;
  return text.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
}
