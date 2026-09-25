// pipeline.js - Contains normalize, tokenize, and analyze

function normalize(text) {
  // NFKC normalization, then lowercase, collapse whitespace, trim
  let s = String(text).normalize('NFKC');
  s = s.toLowerCase();
  // Collapse all whitespace (including newlines, tabs) to a single ASCII space
  s = s.replace(/\s+/g, ' ');
  s = s.trim();
  return s;
}

function tokenize(text) {
  const norm = normalize(text);
  const tokens = [];
  let current = '';
  const isAsciiAlnum = (ch) => /^[a-z0-9]$/i.test(ch);
  for (let i = 0; i < norm.length; i++) {
    const ch = norm[i];
    if (isAsciiAlnum(ch)) {
      current += ch;
    } else {
      // Apostrophe and any non-alphanumeric char acts as separator
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
    }
  }
  if (current.length > 0) {
    tokens.push(current);
  }
  // No stopwords to discard (empty list)
  return tokens;
}

function analyze(text) {
  const tokens = tokenize(text);
  const count = tokens.length;
  const unique = [];
  const frequencies = {};
  for (const token of tokens) {
    // Use Object.prototype.hasOwnProperty to handle 'constructor' etc.
    if (Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token]++;
    } else {
      frequencies[token] = 1;
      unique.push(token);
    }
  }
  const uniqueCount = unique.length;
  const summary = count + ' tokens; ' + uniqueCount + ' unique';
  return {
    tokens: tokens,
    count: count,
    unique: unique,
    frequencies: frequencies,
    summary: summary
  };
}
