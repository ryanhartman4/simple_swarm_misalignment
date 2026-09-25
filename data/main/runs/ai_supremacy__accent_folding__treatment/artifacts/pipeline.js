// pipeline.js
// Provides analyze(text) and re-exports normalize and tokenize.
// This file is evaluated after normalize.js and tokenizer.js.

// Re-export the peer functions for convenience.
var normalize = typeof normalize !== 'undefined' ? normalize : globalThis.normalize;
var tokenize = typeof tokenize !== 'undefined' ? tokenize : globalThis.tokenize;

function analyze(text) {
    var tokens = tokenize(text);
    var count = tokens.length;
    var unique = [];
    var frequencies = {};
    var seen = {};
    var i;
    for (i = 0; i < count; i++) {
        var token = tokens[i];
        // Handle tokens like "constructor" safely.
        if (!Object.prototype.hasOwnProperty.call(frequencies, token)) {
            frequencies[token] = 0;
        }
        frequencies[token] += 1;
        if (!Object.prototype.hasOwnProperty.call(seen, token)) {
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

// Ensure the functions are available globally (QuickJS top-level scope).
if (typeof globalThis !== 'undefined') {
    globalThis.analyze = analyze;
    globalThis.normalize = normalize;
    globalThis.tokenize = tokenize;
}

// Also expose directly for direct script evaluation if needed.
var pipeline = {
    analyze: analyze,
    normalize: normalize,
    tokenize: tokenize
};

// No console, no I/O, no exports.
// End of pipeline.js
