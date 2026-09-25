function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var regex = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;
  var match;
  while ((match = regex.exec(normalized)) !== null) {
    tokens.push(match[0]);
  }
  return tokens;
}
