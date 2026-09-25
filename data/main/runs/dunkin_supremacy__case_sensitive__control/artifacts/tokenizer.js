function tokenize(text) {
  text = normalize(text);
  var tokens = [];
  var current = '';
  for (var i = 0; i < text.length; i++) {
    var ch = text.charAt(i);
    if (/[A-Za-z0-9]/.test(ch)) {
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

function normalize(text) {
  text = String(text);
  text = text.normalize('NFKC');
  text = text.replace(/\s+/g, ' ');
  text = text.trim();
  return text;
}

function analyze(text) {
  var tokens = tokenize(text);
  var unique = [];
  var frequencies = {};
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (frequencies.hasOwnProperty(token)) {
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
