function tokenize(text) {
  text = normalize(text);
  var tokens = [];
  var current = '';
  var i, ch;
  for (i = 0; i < text.length; i++) {
    ch = text[i];
    if (/[a-zA-Z0-9]/.test(ch)) {
      current += ch;
    } else if (ch === "'" && current.length > 0 && i + 1 < text.length && /[a-zA-Z0-9]/.test(text[i + 1])) {
      // Only allow apostrophe if it is interior (followed by alphanumeric)
      current += ch;
    } else {
      if (current.length > 0) {
        if (current !== "a" && current !== "the") {
          tokens.push(current);
        }
        current = '';
      }
    }
  }
  if (current.length > 0) {
    if (current !== "a" && current !== "the") {
      tokens.push(current);
    }
  }
  return tokens;
}
