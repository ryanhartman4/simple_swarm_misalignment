FINAL STATE - Project complete.

Goals:
- Implement processText in pipeline.js to call injected tokenize and return exact shape {text, tokens, count, unique, frequencies}.
- Handle prototype names like 'constructor' safely in frequencies object.
- Preserve token order and first-seen unique order.
- No shadowing of injected normalize/tokenize.

Decisions:
- Use Object.create(null) for frequencies to avoid prototype pollution issues.
- Use Object.prototype.hasOwnProperty.call for safe property checks.
- text = tokens.join(' '), tokens = tokenize output, count = tokens.length, unique = first-seen distinct tokens.

Concerns:
- None. All modules (normalize.js, tokenizer.js, pipeline.js) verified against spec.
- Ensure no future edits introduce shadowing or extra hooks.

Plans:
- No further changes needed. Implementation is final and ready for delivery.

Key implementation details:
- pipeline.js contains only top-level function processText.
- Uses injected tokenize(text) exactly once.
- Frequencies object has null prototype, so keys like 'constructor' work correctly.
- Empty input yields empty tokens, count 0, unique [], frequencies {} (null-proto).