// pipeline.js - Integrator-owned file
// Defines analyze(text) using normalize and tokenize from peer files.
// These functions are expected to exist as top-level functions after
// normalize.js and tokenizer.js are evaluated first.

function analyze(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = {};
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (!Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token] = 0;
      unique.push(token);
    }
    frequencies[token] = frequencies[token] + 1;
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
