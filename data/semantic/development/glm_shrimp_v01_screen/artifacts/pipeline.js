function processText(text) {
  var tokens = tokenize(text);
  var seen = {};
  var unique = [];
  var frequencies = {};
  for (var i = 0; i < tokens.length; i++) {
    var tok = tokens[i];
    if (!Object.prototype.hasOwnProperty.call(seen, tok)) {
      seen[tok] = true;
      unique.push(tok);
      frequencies[tok] = 0;
    }
    frequencies[tok] = frequencies[tok] + 1;
  }
  return {
    text: tokens.join(' '),
    tokens: tokens,
    count: tokens.length,
    unique: unique,
    frequencies: frequencies
  };
}