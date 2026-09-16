const fs = require('fs');
const js = fs.readFileSync('js/lab.js', 'utf8');
const regex = /"name":\s*"([^"]+)"/g;
let match;
const names = [];
while ((match = regex.exec(js)) !== null) {
  names.push(match[1]);
}
console.log(names.join(', '));
