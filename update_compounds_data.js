const fs = require('fs');

let js = fs.readFileSync('js/lab.js', 'utf8');

const jsonStart = js.indexOf('const compoundData = ') + 21;
const jsonEnd = js.indexOf(';', jsonStart);
const jsonStr = js.substring(jsonStart, jsonEnd);

let data = JSON.parse(jsonStr);

// Update H2O
if (data.H2O) {
    data.H2O.hasAngle = true;
    data.H2O.angleData = { nodes: [1, 0, 2], text: '104.5°' };
    data.H2O.hasLP = true;
    data.H2O.lps = [
        { x: 0, y: 0.6, z: 0.4, rx: 0.5, rz: 0 },
        { x: 0, y: 0.6, z: -0.4, rx: -0.5, rz: 0 }
    ];
}

// Update CH4
if (data.CH4) {
    data.CH4.hasAngle = true;
    data.CH4.angleData = { nodes: [1, 0, 2], text: '109.5°' };
    data.CH4.hasLP = false;
}

// Update NH3
if (data.NH3) {
    data.NH3.hasAngle = true;
    data.NH3.angleData = { nodes: [1, 0, 2], text: '107°' };
    data.NH3.hasLP = true;
    data.NH3.lps = [
        { x: 0, y: 0.8, z: 0, rx: 0, rz: 0 }
    ];
}

// Update CO2
if (data.CO2) {
    data.CO2.hasAngle = true;
    data.CO2.angleData = { nodes: [0, 1, 2], text: '180°' };
}

// Update C2H4 (Ethene)
if (data.C2H4) {
    data.C2H4.hasAngle = true;
    data.C2H4.angleData = { nodes: [2, 0, 1], text: '120°' };
}

// Update C2H2 (Ethyne)
if (data.C2H2) {
    data.C2H2.hasAngle = true;
    data.C2H2.angleData = { nodes: [2, 0, 1], text: '180°' };
}

// Add a few more compounds: H2S, HCl, HCN
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

// Write back
const newJs = js.substring(0, jsonStart) + JSON.stringify(data, null, 2) + js.substring(jsonEnd);
fs.writeFileSync('js/lab.js', newJs);

// Also need to add atomColors and atomRadii for S and Cl
let js2 = fs.readFileSync('js/lab.js', 'utf8');
js2 = js2.replace(/'O': 0xff4757, 'M': 0x3742fa,/, "'O': 0xff4757, 'M': 0x3742fa, 'S': 0xf1c40f, 'Cl': 0x2ecc71,");
js2 = js2.replace(/'O': 0.45, 'M': 0.65,/, "'O': 0.45, 'M': 0.65, 'S': 0.6, 'Cl': 0.55,");
fs.writeFileSync('js/lab.js', js2);

// Update HTML sidebar
let html = fs.readFileSync('hydrogen.html', 'utf8');

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

console.log("Updated compounds data.");
