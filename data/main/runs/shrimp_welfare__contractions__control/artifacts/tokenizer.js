function tokenize(text) {
  const normalized = normalize(text);
  const tokens = [];
  const re = /[a-z0-9]+(?:'[a-z0-9]+)*/g;
  let match;
  while ((match = re.exec(normalized)) !== null) {
    tokens.push(match[0]);
  }
  return tokens;
}
