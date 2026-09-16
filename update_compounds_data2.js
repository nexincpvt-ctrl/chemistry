const fs = require('fs');

let js = fs.readFileSync('js/lab.js', 'utf8');
const startToken = 'const compoundData = {';
const startIdx = js.indexOf(startToken);
// Find the closing brace of compoundData
let endIdx = -1;
let openBraces = 0;
let inString = false;
let escape = false;

for (let i = startIdx + startToken.length - 1; i < js.length; i++) {
    const char = js[i];
    if (escape) {
        escape = false;
        continue;
    }
    if (char === '\\\\') {
        escape = true;
        continue;
    }
    if (char === '"' || char === "'") { // Assuming JSON mostly uses double quotes, but just in case
        if (!inString) {
            inString = char;
        } else if (inString === char) {
            inString = false;
        }
    }
    
    if (!inString) {
        if (char === '{') openBraces++;
        if (char === '}') {
            openBraces--;
            if (openBraces === 0) {
                endIdx = i + 1;
                break;
            }
        }
    }
}

let objStr = js.substring(startIdx + 'const compoundData = '.length, endIdx);

let data;
// eval is safe here because it's our own JS file
eval('data = ' + objStr + ';');

// Update compounds
if (data.H2O) {
    data.H2O.hasAngle = true;
    data.H2O.angleData = { nodes: [1, 0, 2], text: '104.5°' };
    data.H2O.hasLP = true;
    data.H2O.lps = [
        { x: 0, y: 0.6, z: 0.4, rx: 0.5, rz: 0 },
        { x: 0, y: 0.6, z: -0.4, rx: -0.5, rz: 0 }
    ];
}
if (data.CH4) {
    data.CH4.hasAngle = true;
    data.CH4.angleData = { nodes: [1, 0, 2], text: '109.5°' };
    data.CH4.hasLP = false;
}
if (data.NH3) {
    data.NH3.hasAngle = true;
    data.NH3.angleData = { nodes: [1, 0, 2], text: '107°' };
    data.NH3.hasLP = true;
    data.NH3.lps = [
        { x: 0, y: 0.8, z: 0, rx: 0, rz: 0 }
    ];
}
if (data.CO2) {
    data.CO2.hasAngle = true;
    data.CO2.angleData = { nodes: [0, 1, 2], text: '180°' };
}
if (data.C2H4) {
    data.C2H4.hasAngle = true;
    data.C2H4.angleData = { nodes: [2, 0, 1], text: '120°' };
}
if (data.C2H2) {
    data.C2H2.hasAngle = true;
    data.C2H2.angleData = { nodes: [2, 0, 1], text: '180°' };
}
if (data.B2H6) {
    data.B2H6.hasAngle = true;
    data.B2H6.angleData = { nodes: [2, 0, 3], text: '97°' };
}
if (data.HF) {
    data.HF.hasAngle = false;
    data.HF.hasLP = true;
    data.HF.lps = [
        { x: 0.8, y: 0.4, z: 0, rx: 0, rz: -0.5 },
        { x: 0.8, y: -0.4, z: 0, rx: 0, rz: 0.5 },
        { x: 0.8, y: 0, z: 0.4, rx: 0.5, rz: 0 }
    ];
}

data.H2S = {
    sym: 'H₂S', name: 'HYDROGEN SULFIDE', hybrid: 'sp³', geom: 'Bent', struct: 'Covalent', desc: 'Foul-smelling gas.', vis2D: 'H-S-H',
    hasAngle: true, angleData: { nodes: [1, 0, 2], text: '92.1°' },
    hasLP: true, lps: [
        { x: 0, y: 0.6, z: 0.4, rx: 0.5, rz: 0 },
        { x: 0, y: 0.6, z: -0.4, rx: -0.5, rz: 0 }
    ],
    atoms: [
        { element: 'S', x: 0, y: 0.2, z: 0 },
        { element: 'H', x: 0.8, y: -0.4, z: 0 },
        { element: 'H', x: -0.8, y: -0.4, z: 0 }
    ],
    bonds: [{ nodes: [0, 1], order: 1 }, { nodes: [0, 2], order: 1 }]
};

data.HCl = {
    sym: 'HCl', name: 'HYDROGEN CHLORIDE', hybrid: 'sp³', geom: 'Linear', struct: 'Covalent (Polar)', desc: 'Strong acid in water.', vis2D: 'H-Cl',
    hasAngle: false, hasLP: true,
    lps: [
        { x: 0.9, y: 0.4, z: 0, rx: 0, rz: -0.5 },
        { x: 0.9, y: -0.4, z: 0, rx: 0, rz: 0.5 },
        { x: 0.9, y: 0, z: 0.4, rx: 0.5, rz: 0 }
    ],
    atoms: [
        { element: 'H', x: -0.6, y: 0, z: 0 },
        { element: 'Cl', x: 0.4, y: 0, z: 0 }
    ],
    bonds: [{ nodes: [0, 1], order: 1 }]
};

data.HCN = {
    sym: 'HCN', name: 'HYDROGEN CYANIDE', hybrid: 'sp', geom: 'Linear', struct: 'Covalent', desc: 'Highly toxic liquid/gas.', vis2D: 'H-C≡N',
    hasAngle: true, angleData: { nodes: [0, 1, 2], text: '180°' },
    hasLP: true, lps: [
        { x: 1.5, y: 0, z: 0, rx: 0, rz: -1.57 }
    ],
    atoms: [
        { element: 'H', x: -1.2, y: 0, z: 0 },
        { element: 'C', x: 0, y: 0, z: 0 },
        { element: 'N', x: 1.0, y: 0, z: 0 }
    ],
    bonds: [{ nodes: [0, 1], order: 1 }, { nodes: [1, 2], order: 3 }]
};

// Rebuild js
let finalJs = js.substring(0, startIdx + 'const compoundData = '.length) + JSON.stringify(data, null, 2) + js.substring(endIdx);
fs.writeFileSync('js/lab.js', finalJs);

// Also update atomColors and atomRadii for S and Cl
let js2 = fs.readFileSync('js/lab.js', 'utf8');
if (!js2.includes("'S':")) {
    js2 = js2.replace(/'O': 0xff4757, 'M': 0x3742fa,/, "'O': 0xff4757, 'M': 0x3742fa, 'S': 0xf1c40f, 'Cl': 0x2ecc71,");
}
if (!js2.includes("'S':")) { // radii
    js2 = js2.replace(/'O': 0.45, 'M': 0.65,/, "'O': 0.45, 'M': 0.65, 'S': 0.6, 'Cl': 0.55,");
}
fs.writeFileSync('js/lab.js', js2);

// Update HTML
let html = fs.readFileSync('hydrogen.html', 'utf8');
if (!html.includes('data-comp="H2S"')) {
    const newItems = '      <div class="comp-item" data-comp="H2S">\\n' +
    '        <div class="comp-item-sym">H₂S</div>\\n' +
    '        <div class="comp-item-name">HYDROGEN SULFIDE</div>\\n' +
    '      </div>\\n' +
    '      <div class="comp-item" data-comp="HCl">\\n' +
    '        <div class="comp-item-sym">HCl</div>\\n' +
    '        <div class="comp-item-name">HYDROGEN CHLORIDE</div>\\n' +
    '      </div>\\n' +
    '      <div class="comp-item" data-comp="HCN">\\n' +
    '        <div class="comp-item-sym">HCN</div>\\n' +
    '        <div class="comp-item-name">HYDROGEN CYANIDE</div>\\n' +
    '      </div>\\n';
    
    html = html.replace('      <div class="comp-item" data-comp="CO2">', newItems + '      <div class="comp-item" data-comp="CO2">');
    fs.writeFileSync('hydrogen.html', html);
}
console.log("Success");
