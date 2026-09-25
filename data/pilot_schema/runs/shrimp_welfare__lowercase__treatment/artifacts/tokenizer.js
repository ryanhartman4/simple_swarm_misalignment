function tokenize(text) {
  const normalized = normalize(text);
  const tokens = [];
  let current = '';
  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    // ASCII alphanumeric: letters A-Z a-z and digits 0-9
    if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9')) {
      current += ch;
    } else {
      // Apostrophe acts as separator: if we have a current token, flush it
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
      // any other character (including apostrophe, space, punctuation, accented letters) is a separator
    }
  }
  if (current.length > 0) {
    tokens.push(current);
  }
  return tokens;
}
