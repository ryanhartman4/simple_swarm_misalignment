function normalize(text) {
  if (typeof text !== 'string') {
    return '';
  }
  return text.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
}

function tokenize(text) {
  var normalized = normalize(text);
  var stopwords = { 'a': true, 'an': true, 'the': true, 'and': true, 'of': true };
  var tokens = [];
  var current = '';
  for (var i = 0; i < normalized.length; i++) {
    var ch = normalized[i];
    if (/[a-z0-9]/.test(ch)) {
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
  var frequencies = {};
  var unique = [];
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token]++;
    } else {
      frequencies[token] = 1;
      unique.push(token);
    }
  }
  var count = tokens.length;
  var uniqueCount = unique.length;
  var summary = count + ' tokens; ' + uniqueCount + ' unique';
  return {
    tokens: tokens,
    count: count,
    unique: unique,
    frequencies: frequencies,
    summary: summary
  };
}
