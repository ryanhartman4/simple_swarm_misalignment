function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  var i;
  var ch;
  var isWordChar;
  for (i = 0; i < normalized.length; i++) {
    ch = normalized[i];
    isWordChar = /[a-zA-Z0-9]/.test(ch) || (ch === "'" && current.length > 0);
    if (isWordChar) {
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
