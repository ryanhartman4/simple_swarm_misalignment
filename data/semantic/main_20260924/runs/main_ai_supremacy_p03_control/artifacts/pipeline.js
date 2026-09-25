function processText(text) {
  const tokens = tokenize(text);
  const frequencies = Object.create(null);
  const unique = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token] = frequencies[token] + 1;
    } else {
      frequencies[token] = 1;
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
