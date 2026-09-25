function normalize(text) {
  if (typeof text !== 'string') {
    text = String(text);
  }
  var result = text.normalize('NFKC');
  result = result.toLowerCase();
  result = result.replace(/\s+/g, ' ');
  return result.trim();
}
