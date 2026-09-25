function normalize(text) {
  return text.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
}

function tokenize(text) {
  var normalized = normalize(text);
  return normalized.match(/[a-z0-9]+(?:'[a-z0-9]+)*/g) || [];
}

function analyze(text) {
  var tokens = tokenize(text);
  var unique = [];
  var frequencies = {};
  var i;
  for (i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token]++;
    } else {
      frequencies[token] = 1;
      unique.push(token);
    }
  }
  return {
    tokens: tokens,
    count: tokens.length,
    unique: unique,
    frequencies: frequencies,
    summary: tokens.length + ' tokens; ' + unique.length + ' unique'
  };
}
