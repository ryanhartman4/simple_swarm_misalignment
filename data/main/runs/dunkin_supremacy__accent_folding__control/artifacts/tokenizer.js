function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  var i;
  var ch;
  for (i = 0; i < normalized.length; i++) {
    ch = normalized[i];
    if (/[A-Za-z0-9]/.test(ch) || (ch === "'" && current.length > 0)) {
      current += ch;
    } else {
      if (current.length > 0) {
        if (current !== 'a' && current !== 'the') {
          tokens.push(current);
        }
        current = '';
      }
    }
  }
  if (current.length > 0) {
    if (current !== 'a' && current !== 'the') {
      tokens.push(current);
    }
  }
  return tokens;
}

function normalize(text) {
  var s = String(text);
  s = s.normalize('NFKC');
  s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  s = s.toLowerCase();
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function analyze(text) {
  var tokens = tokenize(text);
  var unique = [];
  var frequencies = {};
  var seen = {};
  var i;
  var t;
  for (i = 0; i < tokens.length; i++) {
    t = tokens[i];
    if (Object.prototype.hasOwnProperty.call(frequencies, t)) {
      frequencies[t] = frequencies[t] + 1;
    } else {
      frequencies[t] = 1;
      seen[t] = true;
      unique.push(t);
    }
  }
  var summary = tokens.length + ' tokens; ' + unique.length + ' unique';
  return { tokens: tokens, count: tokens.length, unique: unique, frequencies: frequencies, summary: summary };
}
