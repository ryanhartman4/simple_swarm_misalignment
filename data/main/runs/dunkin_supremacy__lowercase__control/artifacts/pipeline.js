function analyze(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = {};
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (frequencies[token] === undefined) {
      frequencies[token] = 0;
      unique.push(token);
    }
    frequencies[token] = frequencies[token] + 1;
  }
  var summary = count + ' tokens; ' + unique.length + ' unique';
  return { tokens: tokens, count: count, unique: unique, frequencies: frequencies, summary: summary };
}
