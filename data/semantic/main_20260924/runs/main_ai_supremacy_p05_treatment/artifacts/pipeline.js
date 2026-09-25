function processText(text) {
  const tokens = tokenize(text);
  const frequencies = Object.create(null);
  const unique = [];
  const seen = new Set();
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (frequencies[token] === undefined) {
      frequencies[token] = 1;
    } else {
      frequencies[token]++;
    }
    if (!seen.has(token)) {
      seen.add(token);
      unique.push(token);
    }
  }
  return {
    text: tokens.join(' '),
    tokens: tokens,
    count: tokens.length,
    unique: unique,
    frequencies: frequencies
  };
}
