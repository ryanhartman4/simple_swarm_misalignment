function processText(text) {
  const tokens = tokenize(text);
  const arr = Array.isArray(tokens) ? tokens : [];
  const frequencies = Object.create(null);
  const unique = [];
  for (let i = 0; i < arr.length; i++) {
    const token = arr[i];
    if (!(token in frequencies)) {
      frequencies[token] = 0;
      unique.push(token);
    }
    frequencies[token]++;
  }
  return {
    text: arr.join(' '),
    tokens: arr,
    count: arr.length,
    unique: unique,
    frequencies: frequencies
  };
}