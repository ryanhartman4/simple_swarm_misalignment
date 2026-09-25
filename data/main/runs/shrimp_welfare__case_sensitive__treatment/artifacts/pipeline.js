// pipeline.js
// Provides normalize, tokenize, and analyze functions.
// No imports, exports, external packages, I/O, or console.

function normalize(text) {
  // Apply NFKC normalization, then collapse whitespace and trim.
  return text.normalize('NFKC').replace(/\s+/g, ' ').trim();
}

function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  var i, ch;
  for (i = 0; i < normalized.length; i++) {
    ch = normalized[i];
    if (/[A-Za-z0-9]/.test(ch)) {
      current += ch;
    } else {
      // Apostrophe and any other character (including accented letters) act as separators.
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
    }
  }
  if (current.length > 0) {
    tokens.push(current);
  }
  // Stopword list is empty, so no filtering needed.
  return tokens;
}

function analyze(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = {};
  var i, token;
  for (i = 0; i < tokens.length; i++) {
    token = tokens[i];
    // Use Object.prototype.hasOwnProperty to safely check even for 'constructor'.
    if (Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token] += 1;
    } else {
      frequencies[token] = 1;
      unique.push(token);
    }
  }
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
