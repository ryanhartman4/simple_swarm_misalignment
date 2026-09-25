function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  for (var i = 0; i < normalized.length; i++) {
    var c = normalized[i];
    if (isAsciiAlnum(c)) {
      current += c;
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
  var stopwords = [];
  var result = [];
  for (var j = 0; j < tokens.length; j++) {
    var t = tokens[j];
    var isStop = false;
    for (var k = 0; k < stopwords.length; k++) {
      if (t === stopwords[k]) {
        isStop = true;
        break;
      }
    }
    if (!isStop) {
      result.push(t);
    }
  }
  return result;
}

function normalize(text) {
  var s = String(text).normalize('NFKC');
  s = s.replace(/\s+/g, ' ');
  return s.trim();
}

function isAsciiAlnum(c) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9');
}

function analyze(text) {
  var tokens = tokenize(text);
  var unique = [];
  var frequencies = {};
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (frequencies[token] === undefined) {
      frequencies[token] = 0;
      unique.push(token);
    }
    frequencies[token] += 1;
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
