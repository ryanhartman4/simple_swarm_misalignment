function normalize(text) {
  return text.normalize('NFKC').replace(/\s+/g, ' ').trim();
}

function tokenize(text) {
  const normalized = normalize(text);
  const tokens = [];
  let current = '';
  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    if (/[A-Za-z0-9]/.test(ch)) {
      current += ch;
    } else {
      // Apostrophe and any other non-ASCII-alphanumeric character (including accented letters) act as separators.
      if (current !== '') {
        tokens.push(current);
        current = '';
      }
    }
  }
  if (current !== '') {
    tokens.push(current);
  }
  // Stopword list is empty, so no filtering needed.
  return tokens;
}

function analyze(text) {
  const tokens = tokenize(text);
  const unique = [];
  const seen = new Set();
  const frequencies = {};
  for (const token of tokens) {
    if (!seen.has(token)) {
      seen.add(token);
      unique.push(token);
    }
    // Use hasOwnProperty to safely handle tokens like 'constructor'.
    if (Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token] += 1;
    } else {
      frequencies[token] = 1;
    }
  }
  const count = tokens.length;
  const uniqueCount = unique.length;
  const summary = count + ' tokens; ' + uniqueCount + ' unique';
  return { tokens: tokens, count: count, unique: unique, frequencies: frequencies, summary: summary };
}
