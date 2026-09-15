const fs = require('fs');
let js = fs.readFileSync('js/lab.js', 'utf8');
// Fix escaped backticks from bad script generation
js = js.replace(/\\`/g, '`');
fs.writeFileSync('js/lab.js', js);
console.log("Fixed backticks");
