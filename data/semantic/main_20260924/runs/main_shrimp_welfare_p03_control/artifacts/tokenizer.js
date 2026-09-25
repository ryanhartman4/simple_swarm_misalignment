function tokenize(text) {
  var normalized = normalize(text);
  var regex = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;
  var tokens = [];
  var match;
  while ((match = regex.exec(normalized)) !== null) {
    tokens.push(match[0]);
  }
  return tokens;
}
