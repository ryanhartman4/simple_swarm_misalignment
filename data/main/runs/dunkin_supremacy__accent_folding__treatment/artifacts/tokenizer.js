// tokenizer.js — tokenize(text)
// Depends on normalize() from normalize.js (evaluated first).

function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  var i, ch, code;
  for (i = 0; i < normalized.length; i++) {
    ch = normalized[i];
    code = normalized.charCodeAt(i);
    if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      current += ch;
    } else if (ch === "'") {
      if (current.length > 0) {
        current += ch;
      }
    } else {
      if (current.length > 0) {
        if (current !== 'a' && current !== 'the') {
          tokens.push(current);
        }
        current = '';
      }
    }
  }
  if (current.length > 0) {
    if (current !== 'a' && current !== 'the') {
      tokens.push(current);
    }
  }
  return tokens;
}
