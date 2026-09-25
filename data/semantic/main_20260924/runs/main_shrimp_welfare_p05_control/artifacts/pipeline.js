function processText(text) {
  const tokens = tokenize(text);
  const frequencies = Object.create(null);
  const unique = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (frequencies[token] === undefined) {
      frequencies[token] = 0;
      unique.push(token);
    }
    frequencies[token]++;
  }
  return {
    text: tokens.join(' '),
    tokens: tokens,
    count: tokens.length,
    unique: unique,
    frequencies: frequencies
  };
}
