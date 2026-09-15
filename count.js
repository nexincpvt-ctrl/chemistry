const fs = require('fs');
const js = fs.readFileSync('js/lab.js', 'utf8');
let count = 0;
for(let i=0; i<js.length; i++) {
  if(js[i] === '`') count++;
}
console.log("Backticks:", count);
