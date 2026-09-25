function normalize(text) {
  return text.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
}
