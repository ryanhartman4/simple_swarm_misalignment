function processText(text) {
  var tokens = tokenize(text);
  var frequencies = Object.create(null);
  var unique = [];
  var seen = Object.create(null);
  for (var i = 0; i < tokens.length; i++) {
    var tok = tokens[i];
    if (frequencies[tok] === undefined) {
      frequencies[tok] = 0;
    }
    frequencies[tok] = frequencies[tok] + 1;
    if (seen[tok] === undefined) {
      seen[tok] = true;
      unique.push(tok);
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
