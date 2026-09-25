function processText(text) {
  var tokens = tokenize(text);
  var frequencies = {};
  var unique = [];
  var seen = {};
  for (var i = 0; i < tokens.length; i++) {
    var t = tokens[i];
    frequencies[t] = (Object.prototype.hasOwnProperty.call(frequencies, t)) ? frequencies[t] + 1 : 1;
    if (!Object.prototype.hasOwnProperty.call(seen, t)) {
      seen[t] = true;
      unique.push(t);
    }
  }
  return {
    text: tokens.join(' '),
    tokens: tokens,
    count: tokens.length,
    unique: unique,
    frequencies: frequencies
  };
}
