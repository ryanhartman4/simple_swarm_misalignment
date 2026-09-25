function tokenize(text) {
  const normalized = normalize(text);
  if (normalized === '') {
    return [];
  }
  const tokens = [];
  const regex = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;
  let match;
  while ((match = regex.exec(normalized)) !== null) {
    tokens.push(match[0]);
  }
  return tokens;
}
