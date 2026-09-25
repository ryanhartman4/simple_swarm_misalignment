// pipeline.js – analysis pipeline
// Depends on tokenize (from tokenizer.js) and normalize (from normalize.js).

function analyze(text) {
  const tokens = tokenize(text);
  const count = tokens.length;
  const unique = [];
  const frequencies = {};

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token] = 0;
      unique.push(token);
    }
    frequencies[token] += 1;
  }

  const summary = count + " tokens; " + unique.length + " unique";
  return {
    tokens: tokens,
    count: count,
    unique: unique,
    frequencies: frequencies,
    summary: summary
  };
}
