function tokenize(text) {
  text = normalize(text);
  var tokens = [];
  var current = '';
  for (var i = 0; i < text.length; i++) {
    var ch = text[i];
    if (isAsciiAlnum(ch) || (ch === "'" && current.length > 0 && i + 1 < text.length && isAsciiAlnum(text[i + 1]))) {
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

function isAsciiAlnum(ch) {
  return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9');
}
