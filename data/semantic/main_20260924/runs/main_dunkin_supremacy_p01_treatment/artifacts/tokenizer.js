function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var re = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;
  var match;
  while ((match = re.exec(normalized)) !== null) {
    tokens.push(match[0]);
  }
  return tokens;
}
