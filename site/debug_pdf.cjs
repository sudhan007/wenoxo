const fs = require('fs');
const path = 'src/routes/tools/+page.svelte';
const content = fs.readFileSync(path, 'utf-8');

// Find and replace the old for loop block with smart-break version
// Locate start: comment line
const startMarker = '  // \u2500\u2500 Original PDF generation (unchanged) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500';
const endMarker = '\r\n}';

const startIdx = content.indexOf(startMarker);
console.log('startIdx:', startIdx);

if (startIdx === -1) {
  // Try without the long dashes
  const alt = content.indexOf('Original PDF generation');
  console.log('alt search idx:', alt);
  // Print surrounding chars
  if (alt !== -1) {
    const snippet = content.substring(alt - 5, alt + 80);
    console.log('snippet:', JSON.stringify(snippet));
  }
}
