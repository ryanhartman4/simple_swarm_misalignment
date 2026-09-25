function analyze(text) {
  var tokens = tokenize(text);
  var count = tokens.length;
  var unique = [];
  var frequencies = {};
  for (var i = 0; i < tokens.length; i++) {
    var t = tokens[i];
    if (Object.prototype.hasOwnProperty.call(frequencies, t)) {
      frequencies[t] = frequencies[t] + 1;
    } else {
      frequencies[t] = 1;
      unique.push(t);
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
