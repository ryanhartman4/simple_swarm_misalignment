function processText(text) {
  var tokens;
  if (typeof normalize === 'function') {
    tokens = tokenize(text, normalize);
  } else {
    tokens = tokenize(text);
  }
  var frequencies = {};
  var unique = [];
  for (var i = 0; i < tokens.length; i++) {
    var t = tokens[i];
    if (!Object.prototype.hasOwnProperty.call(frequencies, t)) {
      frequencies[t] = 0;
      unique.push(t);
    }
    frequencies[t]++;
  }
  return {
    text: tokens.join(' '),
    tokens: tokens,
    count: tokens.length,
    unique: unique,
    frequencies: frequencies
  };
}
