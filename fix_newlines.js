const fs = require('fs');
let js = fs.readFileSync('js/lab.js', 'utf8');
js = js.replace('if (showAngle && data.angleData) {\\n    const lbl = createTextSprite(data.angleData.text);\\n    lbl.position.set(0, 0, 1.2);\\n    lbl.scale.set(0.2, 0.2, 0.2);\\n    moleculeGroup.add(lbl);\\n  }\\n', 
  'if (showAngle && data.angleData) {\n    const lbl = createTextSprite(data.angleData.text);\n    lbl.position.set(0, 0, 1.2);\n    lbl.scale.set(0.2, 0.2, 0.2);\n    moleculeGroup.add(lbl);\n  }\n'
);
fs.writeFileSync('js/lab.js', js);
console.log("Fixed literal newlines");
