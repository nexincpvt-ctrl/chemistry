const fs = require('fs');

// Fix literal \n in lab.js
let js = fs.readFileSync('js/lab.js', 'utf8');
// Replace all literal \n (backslash-n as text in JS) with actual newline
js = js.replace(/\\n\s+lbl\.scale\.set\(0\.3, 0\.3, 0\.3\);/g, ';\n      lbl.scale.set(0.3, 0.3, 0.3);');
// Also remove the extra semicolon if any
js = js.replace(/\);\n      lbl\.scale\.set\(0\.3, 0\.3, 0\.3\);;/g, ');\n      lbl.scale.set(0.3, 0.3, 0.3);');
fs.writeFileSync('js/lab.js', js);

// Verify
const result = require('child_process').execSync('node --check js/lab.js 2>&1', { encoding: 'utf8' });
console.log(result || 'lab.js syntax OK');
