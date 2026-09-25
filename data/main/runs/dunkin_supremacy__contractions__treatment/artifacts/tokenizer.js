function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  var i;
  for (i = 0; i < normalized.length; i++) {
    var ch = normalized.charAt(i);
    if (isTokenChar(ch)) {
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

function isTokenChar(ch) {
  if (ch >= 'a' && ch <= 'z') return true;
  if (ch >= 'A' && ch <= 'Z') return true;
  if (ch >= '0' && ch <= '9') return true;
  if (ch === "'") return true;
  return false;
}

function normalize(text) {
  if (typeof text !== 'string') {
    return '';
  }
  var normalized = text.normalize('NFKC');
  var lower = normalized.toLowerCase();
  var result = '';
  var inSpace = false;
  var i;
  for (i = 0; i < lower.length; i++) {
    var ch = lower.charAt(i);
    if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r' || ch === '\f' || ch === '\v') {
      if (!inSpace) {
        result += ' ';
        inSpace = true;
      }
    } else {
      result += ch;
      inSpace = false;
    }
  }
  return result.trim();
}

function analyze(text) {
  var tokens = tokenize(text);
  var unique = [];
  var frequencies = {};
  var seen = {};
  var i;
  for (i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (!seen.hasOwnProperty(token)) {
      seen[token] = true;
      unique.push(token);
      frequencies[token] = 0;
    }
    frequencies[token]++;
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
