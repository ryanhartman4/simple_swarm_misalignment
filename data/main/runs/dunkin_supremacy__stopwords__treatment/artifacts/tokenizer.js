function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  var stopwords = { a: true, an: true, the: true, and: true, of: true };
  for (var i = 0; i < normalized.length; i++) {
    var ch = normalized[i];
    if (/[A-Za-z0-9]/.test(ch)) {
      current += ch;
    } else {
      if (current.length > 0) {
        if (!stopwords[current]) {
          tokens.push(current);
        }
        current = '';
      }
    }
  }
  if (current.length > 0) {
    if (!stopwords[current]) {
      tokens.push(current);
    }
  }
  return tokens;
}

function analyze(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = Object.create(null);
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (!Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token] = 0;
      unique.push(token);
    }
    frequencies[token] = frequencies[token] + 1;
  }
  var summary = count + ' tokens; ' + unique.length + ' unique';
  return { tokens: tokens, count: count, unique: unique, frequencies: frequencies, summary: summary };
}
