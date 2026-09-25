function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  for (var i = 0; i < normalized.length; i++) {
    var ch = normalized[i];
    if (isAsciiAlnum(ch)) {
      current += ch;
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
  var frequencies = Object.create(null);
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (frequencies[token] !== undefined) {
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

function isAsciiAlnum(ch) {
  var code = ch.charCodeAt(0);
  return (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}
