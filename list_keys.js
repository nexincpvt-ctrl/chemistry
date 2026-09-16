const fs = require('fs');
const js = fs.readFileSync('js/lab.js', 'utf8');
const regex = /"([A-Z0-9\+\-]+)":\s*\{/g;
let match;
const keys = [];
while ((match = regex.exec(js)) !== null) {
  keys.push(match[1]);
}
console.log(keys.join(', '));
