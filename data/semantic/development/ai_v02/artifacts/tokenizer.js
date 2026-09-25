function tokenize(text) {
  const normalized = normalize(text);
  const tokens = normalized.match(/[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g) || [];
  return tokens;
}
