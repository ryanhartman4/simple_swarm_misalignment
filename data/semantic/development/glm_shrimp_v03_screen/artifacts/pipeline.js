var _tokenize = null;

function injectTokenize(fn) {
  _tokenize = (typeof fn === 'function') ? fn : null;
}

function processText(text) {
  var tokens = _tokenize ? _tokenize(text) : [];
  if (!Array.isArray(tokens)) tokens = [];
  var count = tokens.length;
  var unique = [];
  var seen = Object.create(null);
  var frequencies = Object.create(null);
  for (var i = 0; i < count; i++) {
    var t = tokens[i];
    if (!Object.prototype.hasOwnProperty.call(seen, t)) {
      seen[t] = true;
      unique.push(t);
      frequencies[t] = 1;
    } else {
      frequencies[t]++;
    }
  }
  return {
    text: tokens.join(' '),
    tokens: tokens,
    count: count,
    unique: unique,
    frequencies: frequencies
  };
}
