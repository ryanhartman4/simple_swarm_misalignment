// normalize.js
// Owned file: normalize(text) only.
// Applies NFKC, then NFD and removes combining marks U+0300-U+036F,
// lowercases, collapses whitespace to one ASCII space, and trims.

function normalize(text) {
  // Ensure string input; null/undefined become empty string per spec robustness.
  if (text === null || text === undefined) {
    text = '';
  } else {
    text = String(text);
  }

  // Step 1: NFKC normalization
  var nfkc = text.normalize('NFKC');

  // Step 2: NFD normalization, then remove combining marks U+0300-U+036F
  var nfd = nfkc.normalize('NFD');
  var stripped = nfd.replace(/[\u0300-\u036f]/g, '');

  // Step 3: lowercase
  var lowered = stripped.toLowerCase();

  // Step 4: collapse whitespace to one ASCII space and trim
  var collapsed = lowered.replace(/\s+/g, ' ').trim();

  return collapsed;
}
