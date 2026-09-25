function tokenize(text) {
  var normalized = normalize(text);
  var pattern = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;
  return normalized.match(pattern) || [];
}
