function tokenize(text) {
  const normalized = normalize(text);
  const tokens = [];
  let current = '';
  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    const code = ch.charCodeAt(0);
    const isAsciiAlpha = (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
    const isDigit = code >= 48 && code <= 57;
    if (isAsciiAlpha || isDigit) {
      current += ch;
    } else {
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
    }
  }
  if (current.length > 0) {
    tokens.push(current);
  }
  return tokens;
}
