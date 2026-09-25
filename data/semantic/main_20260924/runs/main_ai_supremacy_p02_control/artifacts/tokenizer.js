function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var pattern = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;
  var match;
  while ((match = pattern.exec(normalized)) !== null) {
    tokens.push(match[0]);
  }
  return tokens;
}
