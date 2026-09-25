// pipeline.js - Provides the analyze function for the tokenizer project.
// Depends on normalize.js and tokenizer.js being evaluated first.

function analyze(text) {
  const tokens = tokenize(text);
  const count = tokens.length;
  const unique = [];
  const frequencies = {};
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token]++;
    } else {
      frequencies[token] = 1;
      unique.push(token);
    }
  }
  const summary = count + ' tokens; ' + unique.length + ' unique';
  return {
    tokens: tokens,
    count: count,
    unique: unique,
    frequencies: frequencies,
    summary: summary
  };
}
