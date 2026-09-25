function tokenize(text) {
  const normalized = normalize(text);
  const tokens = [];
  const re = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;
  let match;
  while ((match = re.exec(normalized)) !== null) {
    tokens.push(match[0]);
  }
  return tokens;
}
