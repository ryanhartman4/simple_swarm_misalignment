function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  for (var i = 0; i < normalized.length; i++) {
    var ch = normalized.charAt(i);
    if ((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9')) {
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
  var stopwords = {a: true, an: true, the: true, and: true, of: true};
  var result = [];
  for (var j = 0; j < tokens.length; j++) {
    if (!stopwords[tokens[j]]) {
      result.push(tokens[j]);
    }
  }
  return result;
}
