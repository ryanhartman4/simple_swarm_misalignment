function processText(text) {
  var tokens = tokenize(text);
  var frequencies = Object.create(null);
  var unique = [];
  var i;
  var token;
  for (i = 0; i < tokens.length; i++) {
    token = tokens[i];
    if (Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token]++;
    } else {
      frequencies[token] = 1;
      unique.push(token);
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
