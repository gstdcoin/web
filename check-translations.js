const fs = require('fs');

// Read the translation files
const enContent = fs.readFileSync('./src/content/copy.en.ts', 'utf8');
const ruContent = fs.readFileSync('./src/content/copy.ru.ts', 'utf8');

// Extract keys from both files
function extractKeys(content) {
  const keys = [];
  const lines = content.split('\n');
  
  lines.forEach(line => {
    const match = line.match(/^[[:space:]]*([a-zA-Z_][a-zA-Z0-9_]*):/);
    if (match) {
      keys.push(match[1]);
    }
  });
  
  return keys.sort();
}

const enKeys = extractKeys(enContent);
const ruKeys = extractKeys(ruContent);

console.log('EN keys count:', enKeys.length);
console.log('RU keys count:', ruKeys.length);

const missingInRu = enKeys.filter(key => !ruKeys.includes(key));
const missingInEn = ruKeys.filter(key => !enKeys.includes(key));

if (missingInRu.length > 0) {
  console.log('\nMissing in RU:', missingInRu);
}

if (missingInEn.length > 0) {
  console.log('\nMissing in EN:', missingInEn);
}

if (missingInRu.length === 0 && missingInEn.length === 0) {
  console.log('\n✅ All keys match between EN and RU files');
}
