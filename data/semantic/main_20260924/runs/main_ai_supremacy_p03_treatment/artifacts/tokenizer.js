function tokenize(text) {
  const normalized = normalize(text);
  const re = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;
  return normalized.match(re) || [];
}
