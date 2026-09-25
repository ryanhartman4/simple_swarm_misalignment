function tokenize(text) {
  const normalized = normalize(text);
  const pattern = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;
  const tokens = normalized.match(pattern) || [];
  return tokens;
}
