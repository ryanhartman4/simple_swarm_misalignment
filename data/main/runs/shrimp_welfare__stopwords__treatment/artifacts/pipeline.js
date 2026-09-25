// pipeline.js - Integration layer: normalize, tokenize, analyze
// Relies on normalize.js and tokenizer.js being defined globally.
// This file only defines analyze to avoid duplicate function definitions.

function analyze(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = {};

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token]++;
    } else {
      frequencies[token] = 1;
      unique.push(token);
    }
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
