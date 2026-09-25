// pipeline.js – Provides normalize, tokenize, and analyze functions.

function normalize(text) {
  return text.normalize('NFKC')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text) {
  const normalized = normalize(text);
  const tokens = [];
  const regex = /[a-z0-9]+(?:'[a-z0-9]+)*/g;
  let match;
  while ((match = regex.exec(normalized)) !== null) {
    tokens.push(match[0]);
  }
  return tokens;
}

function analyze(text) {
  const tokens = tokenize(text);
  const unique = [];
  const seen = new Set();
  const frequencies = Object.create(null);
  for (const token of tokens) {
    if (!seen.has(token)) {
      seen.add(token);
      unique.push(token);
    }
    frequencies[token] = (frequencies[token] || 0) + 1;
  }
  const count = tokens.length;
  const summary = count + ' tokens; ' + unique.length + ' unique';
  return { tokens, count, unique, frequencies, summary };
}
