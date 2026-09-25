function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var current = '';
  var i;
  for (i = 0; i < normalized.length; i++) {
    var ch = normalized.charAt(i);
    if (isAsciiAlnum(ch)) {
      current += ch;
    } else if (ch === "'") {
      // Apostrophe is allowed interior only; if we have content before,
      // tentatively include it, but it will be removed if it ends up at edge.
      current += ch;
    } else {
      // separator: flush current after trimming trailing apostrophes
      if (current.length > 0) {
        current = stripEdgeApostrophes(current);
        if (current.length > 0 && current !== "a" && current !== "the") {
          tokens.push(current);
        }
        current = '';
      }
    }
  }
  if (current.length > 0) {
    current = stripEdgeApostrophes(current);
    if (current.length > 0 && current !== "a" && current !== "the") {
      tokens.push(current);
    }
  }
  return tokens;
}

function isAsciiAlnum(ch) {
  var code = ch.charCodeAt(0);
  return (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function stripEdgeApostrophes(str) {
  var start = 0;
  var end = str.length;
  while (start < end && str.charAt(start) === "'") start++;
  while (end > start && str.charAt(end - 1) === "'") end--;
  return str.substring(start, end);
}
