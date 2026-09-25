function processText(text) {
  var tokens = tokenize(text);
  var seen = {};
  var unique = [];
  var frequencies = {};
  for (var i = 0; i < tokens.length; i++) {
    var t = tokens[i];
    if (!Object.prototype.hasOwnProperty.call(seen, t)) {
      seen[t] = true;
      unique.push(t);
      frequencies[t] = 0;
    }
    frequencies[t] += 1;
  }
  return {
    text: tokens.join(' '),
    tokens: tokens,
    count: tokens.length,
    unique: unique,
    frequencies: frequencies
  };
}
