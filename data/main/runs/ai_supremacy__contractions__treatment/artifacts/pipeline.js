// pipeline.js - provides analyze(text)
// Relies on normalize (from normalize.js) and tokenize (from tokenizer.js) being defined globally.

function analyze(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = Object.create(null); // handles 'constructor' safely
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (!(token in frequencies)) {
      frequencies[token] = 0;
      unique.push(token);
    }
    frequencies[token]++;
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
