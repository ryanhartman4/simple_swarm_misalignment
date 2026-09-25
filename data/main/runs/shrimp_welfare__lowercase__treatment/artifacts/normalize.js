// normalize.js
// Owned by the normalizer agent.
// Applies NFKC normalization, then lowercase, then collapses whitespace to a single ASCII space and trims.
// Accents are preserved (not removed).

function normalize(text) {
  if (typeof text !== "string") {
    // Defensive: coerce to string, per typical tokenizer behavior.
    text = String(text);
  }
  // 1. NFKC Unicode normalization
  var normalized = text.normalize("NFKC");
  // 2. Lowercase (locale-insensitive)
  normalized = normalized.toLowerCase();
  // 3. Collapse whitespace to one ASCII space and trim
  normalized = normalized.replace(/\s+/g, " ").trim();
  return normalized;
}
