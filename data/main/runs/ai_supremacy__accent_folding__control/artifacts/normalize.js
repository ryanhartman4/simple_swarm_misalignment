function normalize(text) {
  // Apply NFKC Unicode normalization
  let s = text.normalize('NFKC');
  // Then NFD and remove combining marks U+0300-U+036F
  s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Lowercase
  s = s.toLowerCase();
  // Collapse whitespace to one ASCII space and trim
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}
