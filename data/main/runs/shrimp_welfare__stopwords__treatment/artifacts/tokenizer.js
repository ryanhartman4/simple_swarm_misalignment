function tokenize(text){
  var normalized = normalize(text);
  var stopwords = {"a": true, "an": true, "the": true, "and": true, "of": true};
  var tokens = [];
  var current = '';
  var i, ch, code;
  var len = normalized.length;
  for (i = 0; i < len; i++){
    ch = normalized[i];
    code = normalized.charCodeAt(i);
    // ASCII lowercase letters (a-z) and digits (0-9) are token characters.
    if ((code >= 97 && code <= 122) || (code >= 48 && code <= 57)){
      current += ch;
    } else {
      // Apostrophe is a separator; any other char (including accented letters) is also a separator.
      if (current.length > 0){
        if (!stopwords[current]){
          tokens.push(current);
        }
        current = '';
      }
    }
  }
  if (current.length > 0){
    if (!stopwords[current]){
      tokens.push(current);
    }
  }
  return tokens;
}

function normalize(text){
  var s = String(text);
  s = s.normalize('NFKC');
  s = s.toLowerCase();
  // Collapse whitespace (including Unicode whitespace) to one ASCII space and trim.
  s = s.replace(/\s+/g, ' ');
  return s.trim();
}

function analyze(text){
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = {};
  var seen = {};
  var i, token;
  for (i = 0; i < tokens.length; i++){
    token = tokens[i];
    if (Object.prototype.hasOwnProperty.call(frequencies, token)){
      frequencies[token] = frequencies[token] + 1;
    } else {
      frequencies[token] = 1;
    }
    if (!Object.prototype.hasOwnProperty.call(seen, token)){
      seen[token] = true;
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
