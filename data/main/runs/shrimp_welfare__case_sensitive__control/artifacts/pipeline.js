// pipeline.js - Provides the analyze function that ties normalize and tokenize together.
// This file is loaded after normalize.js and tokenizer.js, which define normalize() and tokenize().

function analyze(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = {};
  var seen = {};
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (!Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token] = 0;
    }
    frequencies[token] = frequencies[token] + 1;
    if (!Object.prototype.hasOwnProperty.call(seen, token)) {
      seen[token] = true;
      unique.push(token);
    }
  }
  var summary = count + " tokens; " + unique.length + " unique";
  return {
    tokens: tokens,
    count: count,
    unique: unique,
    frequencies: frequencies,
    summary: summary
  };
}
