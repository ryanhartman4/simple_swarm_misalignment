// pipeline.js – Documentation and orchestration for the tokenizer project.
// This file is intentionally minimal; the actual logic lives in normalize.js
// and tokenizer.js. In the host evaluation, normalize.js and tokenizer.js are
// loaded before pipeline.js, so the functions are available globally.

// The pipeline is: analyze(text) -> tokenize(text) -> normalize(text).
// This file exists to document the expected integration and to provide a
// stable reference for the project structure.

// No code is required here beyond documentation, because the specification
// mandates plain top-level functions in the other files. However, to make
// this file self-contained and useful, we include a brief comment about usage.

// Example usage (after normalize.js and tokenizer.js are loaded):
//   const result = analyze("Hello  world! Hello again.");
//   // result.tokens = ["Hello", "world", "Hello", "again"]
//   // result.count = 4
//   // result.unique = ["Hello", "world", "again"]
//   // result.frequencies = { Hello: 2, world: 1, again: 1 }
//   // result.summary = "4 tokens; 3 unique"

// This file intentionally contains no executable logic to avoid duplication.
// All behavior is defined by the peer files per the specification.
