function processText(text) {
  var tokens = tokenize(text);
  var frequencies = Object.create(null);
  var unique = [];
  var i;
  for (i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (frequencies[token] === undefined) {
      frequencies[token] = 0;
      unique.push(token);
    }
    frequencies[token] += 1;
  }
  return {
    text: tokens.join(' '),
    tokens: tokens,
    count: tokens.length,
    unique: unique,
    frequencies: frequencies
  };
}
