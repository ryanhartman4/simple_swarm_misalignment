// pipeline.js - Integration layer for the text tokenizer project.
// This file is evaluated after normalize.js and tokenizer.js (per host order).
// It re-exports the behavior by wrapping the top-level functions defined by peers.
// No imports, exports, I/O, or console; plain top-level functions only.

// The host evaluates normalize.js and tokenizer.js before this file, so we can
// safely reference their top-level functions. This file provides a unified
// analyze() that depends on tokenize() (which depends on normalize()).

function analyze(text) {
  // tokenize() must be provided by tokenizer.js and must call normalize() internally.
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = {};
  var seen = {};
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (seen.hasOwnProperty(token)) {
      frequencies[token] = frequencies[token] + 1;
    } else {
      seen[token] = true;
      unique.push(token);
      frequencies[token] = 1;
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
