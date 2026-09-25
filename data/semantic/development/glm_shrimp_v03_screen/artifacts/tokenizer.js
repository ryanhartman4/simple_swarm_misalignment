// tokenizer.js — tokenize(text): normalize then extract ASCII alphanumeric runs
// with interior ASCII apostrophes. Preserves order; no stopwords; keeps negations.

var normalizeRef = null;

// Host calls this to inject the normalize function from normalize.js
function setNormalize(fn) {
  normalizeRef = (typeof fn === 'function') ? fn : null;
}

var TOKEN_RE = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;

function tokenize(text) {
  var norm;
  if (normalizeRef) {
    norm = normalizeRef(text);
  } else {
    // Fallback: basic normalization if injection is unavailable
    var t = (typeof text === 'string') ? text : '';
    norm = t.replace(/\s+/g, ' ').replace(/^ | $/g, '').toLowerCase();
  }
  if (typeof norm !== 'string' || norm.length === 0) {
    return [];
  }
  var out = [];
  var m;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(norm)) !== null) {
    out.push(m[0]);
  }
  return out;
}
