function tokenize(text) {
  const normalized = normalize(text);
  const tokens = [];
  let current = '';
  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    if (/[a-z0-9]/.test(ch)) {
      current += ch;
    } else if (ch === "'") {
      // Apostrophe acts as a separator, so flush any pending token.
      if (current) {
        tokens.push(current);
        current = '';
      }
    } else {
      // Any other character (including accented letters) is a separator.
      if (current) {
        tokens.push(current);
        current = '';
      }
    }
  }
  if (current) {
    tokens.push(current);
  }
  return tokens;
}
