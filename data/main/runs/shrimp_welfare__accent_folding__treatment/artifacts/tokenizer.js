function tokenize(text) {
  text = normalize(text);
  var tokens = [];
  var re = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;
  var match;
  while ((match = re.exec(text)) !== null) {
    tokens.push(match[0]);
  }
  var stopwords = ['a', 'the'];
  var result = [];
  for (var i = 0; i < tokens.length; i++) {
    if (stopwords.indexOf(tokens[i]) === -1) {
      result.push(tokens[i]);
    }
  }
  return result;
}
