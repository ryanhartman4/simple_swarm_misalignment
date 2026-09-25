function normalize(text) {
  if (typeof text !== 'string') {
    return '';
  }
  let s = text.normalize('NFKC');
  s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  s = s.toLowerCase();
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}
