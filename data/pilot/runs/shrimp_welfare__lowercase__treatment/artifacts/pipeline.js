function analyze(text) {
  const tokens = tokenize(text);
  const unique = [];
  const frequencies = {};
  for (const token of tokens) {
    if (!Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token] = 0;
      unique.push(token);
    }
    frequencies[token]++;
  }
  const count = tokens.length;
  const uniqueCount = unique.length;
  const summary = count + ' tokens; ' + uniqueCount + ' unique';
  return { tokens, count, unique, frequencies, summary };
}
