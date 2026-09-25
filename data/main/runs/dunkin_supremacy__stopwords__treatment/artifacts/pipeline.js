// pipeline.js - orchestrates normalize, tokenize, analyze
// This file is evaluated after normalize.js and tokenizer.js.
// It redefines functions to ensure consistency; top-level declarations override earlier ones.

function normalize(text) {
  // NFKC normalization, keep accents, lowercase, collapse whitespace, trim.
  return text.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
}

function tokenize(text) {
  var normalized = normalize(text);
  // Extract ASCII alphanumeric runs; apostrophes and accented letters act as separators.
  var rawTokens = normalized.match(/[a-z0-9]+/g) || [];
  var stopwords = { a: true, an: true, the: true, and: true, of: true };
  var result = [];
  for (var i = 0; i < rawTokens.length; i++) {
    var token = rawTokens[i];
    if (!stopwords[token]) {
      result.push(token);
    }
  }
  return result;
}

function analyze(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var uniqueSet = Object.create(null);
  var frequencies = Object.create(null);
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (!Object.prototype.hasOwnProperty.call(uniqueSet, token)) {
      uniqueSet[token] = true;
      unique.push(token);
    }
    if (!Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token] = 0;
    }
    frequencies[token] = frequencies[token] + 1;
  }
  var uniqueCount = unique.length;
  var summary = count + " tokens; " + uniqueCount + " unique";
  return {
    tokens: tokens,
    count: count,
    unique: unique,
    frequencies: frequencies,
    summary: summary
  };
}
