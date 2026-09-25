function tokenize(text, normalize) {
  var normalized = normalize(text);
  if (typeof normalized !== 'string' || normalized.length === 0) {
    return [];
  }
  var tokens = [];
  var re = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;
  var m;
  while ((m = re.exec(normalized)) !== null) {
    tokens.push(m[0]);
  }
  return tokens;
}
