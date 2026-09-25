function normalize(text) {
  if (typeof text !== 'string') {
    return '';
  }
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\s\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+/g, ' ')
    .trim();
}
