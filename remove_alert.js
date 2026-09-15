const fs = require('fs');
let js = fs.readFileSync('js/lab.js', 'utf8');
js = js.replace(/alert\([^)]+\);/g, '');
fs.writeFileSync('js/lab.js', js);
console.log("Removed alert");
