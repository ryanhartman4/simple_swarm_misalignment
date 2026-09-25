// pipeline.js — analyze function
// Depends on normalize (normalize.js) and tokenize (tokenizer.js), which are evaluated before this file.

function analyze(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var seen = {};
  var frequencies = {};
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (!Object.prototype.hasOwnProperty.call(seen, token)) {
      seen[token] = true;
      unique.push(token);
    }
    if (Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token] = frequencies[token] + 1;
    } else {
      frequencies[token] = 1;
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
