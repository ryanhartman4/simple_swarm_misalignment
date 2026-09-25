// normalize.js
function normalize(text) {
  if (typeof text !== 'string') {
    return '';
  }
  let s = text.normalize('NFKC');
  s = s.toLowerCase();
  // Collapse whitespace (any Unicode whitespace) to a single ASCII space, then trim.
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}
