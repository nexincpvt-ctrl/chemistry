const fs = require('fs');

let js = fs.readFileSync('js/lab.js', 'utf8');
const startToken = 'const compoundData = {';
const startIdx = js.indexOf(startToken);
let endIdx = -1;
let openBraces = 0;
let inString = false;
let escape = false;

for (let i = startIdx + startToken.length - 1; i < js.length; i++) {
    const char = js[i];
    if (escape) { escape = false; continue; }
    if (char === '\\\\') { escape = true; continue; }
    if (char === '"' || char === "'") {
        if (!inString) inString = char;
        else if (inString === char) inString = false;
    }
    if (!inString) {
        if (char === '{') openBraces++;
        if (char === '}') {
            openBraces--;
            if (openBraces === 0) { endIdx = i + 1; break; }
        }
    }
}

let objStr = js.substring(startIdx + 'const compoundData = '.length, endIdx);
let data;
eval('data = ' + objStr + ';');

if (data.D2O) {
    data.D2O.hasAngle = true;
    data.D2O.angleData = { nodes: [1, 0, 2], text: '104.5°' };
}
if (data['H3O+']) {
    data['H3O+'].hasAngle = true;
    data['H3O+'].angleData = { nodes: [1, 0, 2], text: '113°' };
}
if (data.H2O2) {
    // H-O-O angle is ~94.8. Let's just do one of them.
    data.H2O2.hasAngle = true;
    data.H2O2.angleData = { nodes: [2, 0, 1], text: '94.8°' };
}
if (data.CH3OH) {
    // C-O-H is ~108.5, H-C-H is ~109.5. We will show C-O-H.
    data.CH3OH.hasAngle = true;
    data.CH3OH.angleData = { nodes: [0, 1, 5], text: '108.5°' };
}
if (data.C2H5OH) {
    // C-C-O is ~109.5. C-O-H is ~108.5. Let's show C-O-H
    data.C2H5OH.hasAngle = true;
    data.C2H5OH.angleData = { nodes: [1, 2, 8], text: '108.5°' };
}
if (data.C3H8) {
    // C-C-C is ~112. Let's show that.
    data.C3H8.hasAngle = true;
    data.C3H8.angleData = { nodes: [0, 1, 2], text: '112°' };
}

let finalJs = js.substring(0, startIdx + 'const compoundData = '.length) + JSON.stringify(data, null, 2) + js.substring(endIdx);
fs.writeFileSync('js/lab.js', finalJs);
console.log("Updated angles for remaining compounds.");
