function normalize(text) {
  // Ensure input is a string; if not, coerce to string per spec
  if (typeof text !== 'string') {
    text = String(text);
  }
  // Apply NFKC Unicode normalization
  var normalized = text.normalize('NFKC');
  // Do not remove accents; preserve letter case
  // Collapse whitespace to one ASCII space and trim
  // Use regex to replace any sequence of whitespace (including newlines, tabs, etc.)
  // with a single ASCII space, then trim leading/trailing spaces
  var collapsed = normalized.replace(/\s+/g, ' ').trim();
  return collapsed;
}