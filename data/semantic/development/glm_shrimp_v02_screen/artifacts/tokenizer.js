function tokenize(text, normalize) {
  if (typeof text !== 'string') text = String(text);
  var normalized = (typeof normalize === 'function') ? normalize(text) : text;
  var tokens = [];
  var re = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;
  var m;
  while ((m = re.exec(normalized)) !== null) {
    tokens.push(m[0]);
  }
  return tokens;
}
