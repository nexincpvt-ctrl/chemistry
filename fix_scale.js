const fs = require('fs');
let js = fs.readFileSync('js/lab.js', 'utf8');
js = js.replace('lbl.position.copy(pCenter.position).add(bisector.multiplyScalar(arcRadius + 0.3));',
'lbl.position.copy(pCenter.position).add(bisector.multiplyScalar(arcRadius + 0.3));\\n      lbl.scale.set(0.3, 0.3, 0.3);');
js = js.replace('lbl.position.set(0, 1.0, 0);',
'lbl.position.set(0, 1.0, 0);\\n      lbl.scale.set(0.3, 0.3, 0.3);');
fs.writeFileSync('js/lab.js', js);
console.log("Scale fixed.");
