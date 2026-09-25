// tokenizer.js — owns tokenize(text)
// Injected by host: normalize(text) from normalize.js

function tokenize(text) {
  var normalized;
  if (typeof normalize !== 'function') {
    throw new Error('normalize(text) must be injected by the host');
  }
  normalized = normalize(text);

  var tokens = [];
  if (typeof normalized !== 'string' || normalized.length === 0) {
    return tokens;
  }

  // Extract ASCII alphanumeric runs with interior ASCII apostrophes:
  // [A-Za-z0-9]+(?:'[A-Za-z0-9]+)*
  var pattern = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;
  var match;
  while ((match = pattern.exec(normalized)) !== null) {
    tokens.push(match[0]);
  }
  return tokens;
}
