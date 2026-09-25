function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  for (var i = 0; i < normalized.length; i++) {
    var ch = normalized[i];
    if (isAsciiAlphanumeric(ch)) {
      current += ch;
    } else {
      // any non-ASCII-alphanumeric character, including apostrophes and accented letters,
      // acts as a separator: flush current token if any
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
    }
  }
  if (current.length > 0) {
    tokens.push(current);
  }
  // stopwords list is empty per specification, so no filtering needed
  return tokens;
}

function isAsciiAlphanumeric(ch) {
  return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9');
}
