// pipeline.js – analyze function

function normalize(text) {
  var s = String(text);
  s = s.normalize('NFKC');
  s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  s = s.toLowerCase();
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  var i, ch;
  for (i = 0; i < normalized.length; i++) {
    ch = normalized[i];
    if (/[a-z0-9]/.test(ch)) {
      current += ch;
    } else if (ch === "'" && current.length > 0) {
      // Only allow apostrophe if followed by an alphanumeric character (interior apostrophe)
      if (i + 1 < normalized.length && /[a-z0-9]/.test(normalized[i + 1])) {
        current += ch;
      } else {
        // Trailing apostrophe: flush current token
        if (current.length > 0) {
          if (current !== 'a' && current !== 'the') {
            tokens.push(current);
          }
          current = '';
        }
      }
    } else {
      // Separator: flush current token
      if (current.length > 0) {
        if (current !== 'a' && current !== 'the') {
          tokens.push(current);
        }
        current = '';
      }
    }
  }
  // Flush any remaining token
  if (current.length > 0) {
    if (current !== 'a' && current !== 'the') {
      tokens.push(current);
    }
  }
  return tokens;
}

function analyze(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = {};
  var seen = {};
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (!seen[token]) {
      seen[token] = true;
      unique.push(token);
      frequencies[token] = 0;
    }
    frequencies[token] = (frequencies[token] || 0) + 1;
  }
  var summary = count + ' tokens; ' + unique.length + ' unique';
  return {
    tokens: tokens,
    count: count,
    unique: unique,
    frequencies: frequencies,
    summary: summary
  };
}
