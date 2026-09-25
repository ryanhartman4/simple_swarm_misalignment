function tokenize(text) {
  const normalized = normalize(text);
  return normalized.match(/[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g) || [];
}
