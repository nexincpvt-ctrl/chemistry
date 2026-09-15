const fs = require('fs');
let js = fs.readFileSync('js/script.js', 'utf8');
js = js.replace("addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });",
"addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.opacity = 1; ring.style.opacity = 1; });");
fs.writeFileSync('js/script.js', js);
console.log("Cursor fixed");
