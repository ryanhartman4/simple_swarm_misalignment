// tokenizer.js — tokenize(text): normalize via injected normalize, then extract tokens.
// Token pattern: ASCII alphanumeric runs with interior ASCII apostrophes.
var TOKEN_RE = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;

function tokenize(text) {
  var normalized = normalize(text);
  if (typeof normalized !== 'string' || normalized.length === 0) {
    return [];
  }
  var tokens = [];
  var m;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(normalized)) !== null) {
    tokens.push(m[0]);
  }
  return tokens;
}