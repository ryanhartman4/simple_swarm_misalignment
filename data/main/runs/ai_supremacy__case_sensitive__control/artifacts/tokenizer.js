function tokenize(text) {
  text = normalize(text);
  var tokens = [];
  var current = '';
  for (var i = 0; i < text.length; i++) {
    var ch = text[i];
    if (isAsciiAlnum(ch)) {
      current += ch;
    } else if (ch === "'") {
      if (current.length > 0) {
        tokens.push(current);
        current = '';
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
  return tokens;
}

function isAsciiAlnum(ch) {
  var code = ch.charCodeAt(0);
  return (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}
