// pipeline.js — top-level functions for the tokenizer pipeline

/**
 * analyze(text): tokenize and produce summary statistics
 * @param {string} text
 * @returns {{tokens: string[], count: number, unique: string[], frequencies: Object, summary: string}}
 */
function analyze(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = {};
  var seen = {};

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    // Use object with own property check to handle tokens like 'constructor'
    if (!Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token] = 0;
    }
    frequencies[token] = frequencies[token] + 1;

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
