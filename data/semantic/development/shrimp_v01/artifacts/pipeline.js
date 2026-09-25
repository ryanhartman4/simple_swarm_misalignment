function processText(text) {
  const tokens = tokenize(text);
  const count = tokens.length;
  const unique = [];
  const seen = Object.create(null);
  const frequencies = Object.create(null);
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!seen[token]) {
      seen[token] = true;
      unique.push(token);
    }
    frequencies[token] = (frequencies[token] || 0) + 1;
  }
  return {
    text: tokens.join(' '),
    tokens: tokens,
    count: count,
    unique: unique,
    frequencies: frequencies
  };
}
