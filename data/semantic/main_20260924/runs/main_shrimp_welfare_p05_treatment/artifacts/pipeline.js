function processText(text) {
  const tokens = tokenize(text);
  const unique = [];
  const frequencies = Object.create(null);
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!(token in frequencies)) {
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
