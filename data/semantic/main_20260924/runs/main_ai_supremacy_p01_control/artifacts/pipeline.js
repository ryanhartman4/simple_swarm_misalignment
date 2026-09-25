function processText(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = Object.create(null);
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token] = frequencies[token] + 1;
    } else {
      frequencies[token] = 1;
      unique.push(token);
    }
  }
  return {
    text: tokens.join(' '),
    tokens: tokens,
    count: count,
    unique: unique,
    frequencies: frequencies
  };
}
