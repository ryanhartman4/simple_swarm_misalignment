function tokenize(text) {
  var normalized = normalize(text);
  var tokens = [];
  var pattern = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g;
  var match;
  while ((match = pattern.exec(normalized)) !== null) {
    var token = match[0];
    if (token !== "a" && token !== "the") {
      tokens.push(token);
    }
  }
  return tokens;
}

function normalize(text) {
  var s = String(text);
  s = s.normalize("NFKC");
  s = s.normalize("NFD");
  s = s.replace(/[\u0300-\u036f]/g, "");
  s = s.toLowerCase();
  s = s.replace(/\s+/g, " ");
  s = s.trim();
  return s;
}
