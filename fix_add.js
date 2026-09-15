const fs = require('fs');

let js = fs.readFileSync('add_compounds.js', 'utf8');
js = js.replace(/\\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync('add_compounds.js', js);
console.log("Fixed");
