// pipeline.js - text processing pipeline for tokenizer project
// Owned by integrator. Provides normalize, tokenize, analyze.

// Normalize: NFKC, lowercase, collapse whitespace to single ASCII space, trim.
function normalize(text) {
  var s = String(text);
  s = s.normalize('NFKC');
  s = s.toLowerCase();
  s = s.replace(/\s+/g, ' ');
  s = s.trim();
  return s;
}

// Tokenize: normalize then extract ASCII alphanumeric words with apostrophes as separators.
// Discard exact stopwords after normalization: a, an, the, and, of.
// Accented letters are separators. Keep digit runs.
function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  for (var i = 0; i < normalized.length; i++) {
    var ch = normalized[i];
    // ASCII letters and digits are token characters.
    if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9')) {
      current += ch;
    } else {
      // Apostrophe acts as a separator: end current token if any.
      // Any other character (including accented letters) is also a separator.
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
    }
  }
  if (current.length > 0) {
    tokens.push(current);
  }
  return filterStopwords(tokens);
}

function filterStopwords(tokens) {
  var stopwords = { 'a': true, 'an': true, 'the': true, 'and': true, 'of': true };
  var result = [];
  for (var i = 0; i < tokens.length; i++) {
    if (!stopwords[tokens[i]]) {
      result.push(tokens[i]);
    }
  }
  return result;
}

// Analyze: return object with tokens, count, unique, frequencies, summary.
function analyze(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var seen = Object.create(null);
  var frequencies = Object.create(null);
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (!seen[token]) {
      seen[token] = true;
      unique.push(token);
      frequencies[token] = 0;
    }
    frequencies[token] = frequencies[token] + 1;
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
