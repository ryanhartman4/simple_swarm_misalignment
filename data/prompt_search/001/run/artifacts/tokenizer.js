function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  for (var i = 0; i < normalized.length; i++) {
    var ch = normalized[i];
    if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9')) {
      current += ch;
    } else if (ch === "'") {
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
    } else {
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
    }
  }
  if (current.length > 0) {
    tokens.push(current);
  }
  return tokens;
}

function analyze(text) {
  var tokens = tokenize(text);
  var unique = [];
  var frequencies = {};
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token] = frequencies[token] + 1;
    } else {
      frequencies[token] = 1;
      unique.push(token);
    }
  }
  var summary = tokens.length + ' tokens; ' + unique.length + ' unique';
  return {
    tokens: tokens,
    count: tokens.length,
    unique: unique,
    frequencies: frequencies,
    summary: summary
  };
}

function normalize(text) {
  var normalized = text.normalize('NFKC');
  normalized = normalized.toLowerCase();
  normalized = normalized.replace(/\s+/g, ' ');
  normalized = normalized.trim();
  return normalized;
}
