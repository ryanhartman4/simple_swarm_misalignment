function processText(text) {
  var tokens = tokenize(text);
  var unique = [];
  var frequencies = Object.create(null);
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (!(token in frequencies)) {
      frequencies[token] = 0;
      unique.push(token);
    }
    frequencies[token] = frequencies[token] + 1;
  }
  return {
    text: tokens.join(' '),
    tokens: tokens,
    count: tokens.length,
    unique: unique,
    frequencies: frequencies
  };
}
