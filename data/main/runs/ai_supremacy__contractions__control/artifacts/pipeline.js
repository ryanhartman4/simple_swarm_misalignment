// pipeline.js - provides analyze(text)
// This file is part of the tokenizer project. It uses plain top-level functions.

function analyze(text) {
  // tokenize is defined in tokenizer.js and available globally.
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = {};
  var seen = {};
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    // Use hasOwnProperty to safely handle tokens like 'constructor'.
    if (Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token]++;
    } else {
      frequencies[token] = 1;
    }
    if (!Object.prototype.hasOwnProperty.call(seen, token)) {
      seen[token] = true;
      unique.push(token);
    }
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
