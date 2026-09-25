function processText(text) {
  const tokens = tokenize(text);
  const count = tokens.length;
  const unique = [];
  const frequencies = Object.create(null);
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (frequencies[token] === undefined) {
      frequencies[token] = 1;
      unique.push(token);
    } else {
      frequencies[token]++;
    }
  }
  return {
    text: tokens.join(' '),
    tokens: tokens,
    count: count,
    unique: unique,
    frequencies: frequencies
  };
}
