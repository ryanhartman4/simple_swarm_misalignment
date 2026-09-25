function processText(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = Object.create(null);
  var seen = Object.create(null);
  var i;
  for (i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (!seen[token]) {
      seen[token] = true;
      unique.push(token);
    }
    if (frequencies[token] === undefined) {
      frequencies[token] = 1;
    } else {
      frequencies[token] = frequencies[token] + 1;
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
