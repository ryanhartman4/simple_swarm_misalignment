function tokenize(text) {
  var normalized = normalize(text);
  if (normalized === '') {
    return [];
  }
  var tokens = [];
  var current = '';
  var i;
  var ch;
  for (i = 0; i < normalized.length; i++) {
    ch = normalized[i];
    if (isAsciiAlnum(ch)) {
      current += ch;
    } else if (ch === "'") {
      // apostrophe acts as a separator; it does not join parts
      if (current !== '') {
        tokens.push(current);
        current = '';
      }
      // skip the apostrophe
    } else {
      // any other character (including accented letters) is a separator
      if (current !== '') {
        tokens.push(current);
        current = '';
      }
    }
  }
  if (current !== '') {
    tokens.push(current);
  }
  return tokens;
}

function isAsciiAlnum(ch) {
  var code = ch.charCodeAt(0);
  return (code >= 48 && code <= 57) || // 0-9
         (code >= 65 && code <= 90) || // A-Z
         (code >= 97 && code <= 122); // a-z
}
