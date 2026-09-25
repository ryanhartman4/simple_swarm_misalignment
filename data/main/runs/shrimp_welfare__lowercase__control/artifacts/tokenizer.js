function tokenize(text) {
  const normalized = normalize(text);
  const tokens = [];
  let current = '';
  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    if (/[A-Za-z0-9]/.test(ch)) {
      current += ch;
    } else {
      if (current) {
        tokens.push(current);
        current = '';
      }
    }
  }
  if (current) tokens.push(current);
  return tokens;
}
