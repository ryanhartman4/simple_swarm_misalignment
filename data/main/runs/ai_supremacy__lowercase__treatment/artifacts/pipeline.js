// pipeline.js — top-level functions for text tokenization

// Apply NFKC normalization, lowercase, collapse whitespace, trim.
function normalize(text) {
  if (typeof text !== 'string') {
    return '';
  }
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

// Normalize then extract ASCII alphanumeric tokens; apostrophes separate.
function tokenize(text) {
  var normalized = normalize(text);
  if (normalized === '') {
    return [];
  }
  // Split on any character that is not ASCII letter, ASCII digit, or apostrophe.
  // Then split each chunk on apostrophes to separate, and filter out empty strings.
  var tokens = [];
  var chunks = normalized.split(/[^a-z0-9']+/);
  for (var i = 0; i < chunks.length; i++) {
    var chunk = chunks[i];
    if (chunk === '') {
      continue;
    }
    var parts = chunk.split("'");
    for (var j = 0; j < parts.length; j++) {
      if (parts[j] !== '') {
        tokens.push(parts[j]);
      }
    }
  }
  return tokens;
}

// Analyze: tokens, count, unique in first-seen order, frequencies, summary.
function analyze(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = {};
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (Object.prototype.hasOwnProperty.call(frequencies, token)) {
      frequencies[token] = frequencies[token] + 1;
    } else {
      frequencies[token] = 1;
      unique.push(token);
    }
  }
  var summary = count + ' tokens; ' + unique.length + ' unique';
  return {
    tokens: tokens,
    count: count,
    unique: unique,
    frequencies: frequencies,
    summary: summary
  };
}
