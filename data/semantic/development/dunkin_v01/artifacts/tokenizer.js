function tokenize(text) {
  if (typeof text !== 'string') {
    return [];
  }
  var normalized = normalize(text);
  var tokens = normalized.match(/[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g);
  return tokens ? tokens : [];
}
