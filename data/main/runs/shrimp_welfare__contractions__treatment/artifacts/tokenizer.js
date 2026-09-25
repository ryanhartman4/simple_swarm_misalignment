function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  for (var i = 0; i < normalized.length; i++) {
    var ch = normalized.charAt(i);
    if (/[a-z0-9]/.test(ch)) {
      current += ch;
    } else if (ch === "'") {
      // Apostrophe is allowed only if it is interior to a word,
      // i.e., we already have a letter/digit before it and a letter/digit after it.
      if (current.length > 0 && i + 1 < normalized.length && /[a-z0-9]/.test(normalized.charAt(i + 1))) {
        current += ch;
      } else {
        if (current.length > 0) {
          tokens.push(current);
          current = '';
        }
      }
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
  // No stopwords to discard after normalization per spec.
  return tokens;
}
