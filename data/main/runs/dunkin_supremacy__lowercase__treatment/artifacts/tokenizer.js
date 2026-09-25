function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  for (var i = 0; i < normalized.length; i++) {
    var ch = normalized[i];
    // ASCII alphanumeric characters (letters and digits) are kept as part of a token
    if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9')) {
      current += ch;
    } else {
      // Any other character (including apostrophe, accented letters, punctuation, whitespace)
      // acts as a separator. If we have a current token, push it and reset.
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
    }
  }
  // Push any trailing token
  if (current.length > 0) {
    tokens.push(current);
  }
  return tokens;
}
