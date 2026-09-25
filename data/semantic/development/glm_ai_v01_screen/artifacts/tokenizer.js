// tokenizer.js — extract ASCII alphanumeric runs with interior ASCII apostrophes.
// Relies on the host-injected normalize(text) from normalize.js.

var TOKEN_RE = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;

function tokenize(text) {
  var normalized = normalize(text);
  if (typeof normalized !== 'string' || normalized.length === 0) {
    return [];
  }
  var tokens = [];
  var match;
  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(normalized)) !== null) {
    tokens.push(match[0]);
    if (match.index === TOKEN_RE.lastIndex) {
      TOKEN_RE.lastIndex += 1; // guard against zero-length loops
    }
  }
  return tokens;
}
