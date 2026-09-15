const fs = require('fs');

const atomColors = {
  'H': 0xe0e0e0, 'D': 0xffd54f, 'O': 0xff4757, 'M': 0x3742fa,
  'Li': 0x9c27b0, 'Na': 0x673ab7, 'Ca': 0x3f51b5, 'Mg': 0x2196f3,
  'C': 0x2d3436, 'N': 0x0984e3, 'F': 0x00cec9, 'B': 0xfdcb6e
};

const atomRadii = {
  'H': 0.35, 'D': 0.35, 'O': 0.45, 'M': 0.65,
  'Li': 0.6, 'Na': 0.65, 'Ca': 0.7, 'Mg': 0.65,
  'C': 0.5, 'N': 0.45, 'F': 0.4, 'B': 0.55
};

const compounds = {
  'H2': { sym: 'H₂', name: 'DIHYDROGEN', hybrid: 's-s', geom: 'Linear', struct: 'Covalent', desc: 'Lightest molecule.', vis2D: 'H-H', atoms: [{element:'H',x:-0.4,y:0,z:0}, {element:'H',x:0.4,y:0,z:0}], bonds: [{nodes:[0,1],order:1}] },
  'H2O': { sym: 'H₂O', name: 'WATER', hybrid: 'sp³', geom: 'Bent', struct: 'Covalent (Polar)', desc: 'Universal solvent.', vis2D: 'H-O-H', atoms: [{element:'O',x:0,y:0.2,z:0},{element:'H',x:0.76,y:-0.38,z:0},{element:'H',x:-0.76,y:-0.38,z:0}], bonds: [{nodes:[0,1],order:1},{nodes:[0,2],order:1}] },
  'D2O': { sym: 'D₂O', name: 'HEAVY WATER', hybrid: 'sp³', geom: 'Bent', struct: 'Covalent', desc: 'Used in reactors.', vis2D: 'D-O-D', atoms: [{element:'O',x:0,y:0.2,z:0},{element:'D',x:0.76,y:-0.38,z:0},{element:'D',x:-0.76,y:-0.38,z:0}], bonds: [{nodes:[0,1],order:1},{nodes:[0,2],order:1}] },
  'H2O2': { sym: 'H₂O₂', name: 'PEROXIDE', hybrid: 'sp³', geom: 'Open Book', struct: 'Non-planar', desc: 'Oxidizing agent.', vis2D: 'H-O-O-H', atoms: [{element:'O',x:-0.7,y:0.4,z:0},{element:'O',x:0.7,y:0.4,z:0},{element:'H',x:-0.9,y:-0.4,z:0.5},{element:'H',x:0.9,y:-0.4,z:-0.5}], bonds: [{nodes:[0,1],order:1},{nodes:[0,2],order:1},{nodes:[1,3],order:1}] },
  'LiH': { sym: 'LiH', name: 'LITHIUM HYDRIDE', hybrid: 'None', geom: 'Linear', struct: 'Ionic', desc: 'Alkali metal hydride.', vis2D: 'Li⁺ H⁻', atoms: [{element:'Li',x:-0.6,y:0,z:0}, {element:'H',x:0.6,y:0,z:0}], bonds: [{nodes:[0,1],order:1}] },
  'NaH': { sym: 'NaH', name: 'SODIUM HYDRIDE', hybrid: 'None', geom: 'Linear', struct: 'Ionic', desc: 'Used as a strong base.', vis2D: 'Na⁺ H⁻', atoms: [{element:'Na',x:-0.7,y:0,z:0}, {element:'H',x:0.7,y:0,z:0}], bonds: [{nodes:[0,1],order:1}] },
  'CaH2': { sym: 'CaH₂', name: 'CALCIUM HYDRIDE', hybrid: 'None', geom: 'Linear', struct: 'Ionic', desc: 'Alkaline earth hydride.', vis2D: 'H-Ca-H', atoms: [{element:'Ca',x:0,y:0,z:0}, {element:'H',x:-1,y:0,z:0}, {element:'H',x:1,y:0,z:0}], bonds: [{nodes:[0,1],order:1},{nodes:[0,2],order:1}] },
  'MgH2': { sym: 'MgH₂', name: 'MAGNESIUM HYDRIDE', hybrid: 'None', geom: 'Linear', struct: 'Ionic/Covalent', desc: 'Hydrogen storage material.', vis2D: 'H-Mg-H', atoms: [{element:'Mg',x:0,y:0,z:0}, {element:'H',x:-1,y:0,z:0}, {element:'H',x:1,y:0,z:0}], bonds: [{nodes:[0,1],order:1},{nodes:[0,2],order:1}] },
  'CH4': { sym: 'CH₄', name: 'METHANE', hybrid: 'sp³', geom: 'Tetrahedral', struct: 'Covalent', desc: 'Simplest alkane.', vis2D: 'CH4', atoms: [{element:'C',x:0,y:0,z:0}, {element:'H',x:0.6,y:0.6,z:0.6}, {element:'H',x:-0.6,y:-0.6,z:0.6}, {element:'H',x:0.6,y:-0.6,z:-0.6}, {element:'H',x:-0.6,y:0.6,z:-0.6}], bonds: [{nodes:[0,1],order:1},{nodes:[0,2],order:1},{nodes:[0,3],order:1},{nodes:[0,4],order:1}] },
  'NH3': { sym: 'NH₃', name: 'AMMONIA', hybrid: 'sp³', geom: 'Trigonal Pyramidal', struct: 'Covalent', desc: 'Pungent gas, fertilizer base.', vis2D: 'NH3', atoms: [{element:'N',x:0,y:0.3,z:0}, {element:'H',x:0,y:-0.4,z:0.8}, {element:'H',x:0.7,y:-0.4,z:-0.4}, {element:'H',x:-0.7,y:-0.4,z:-0.4}], bonds: [{nodes:[0,1],order:1},{nodes:[0,2],order:1},{nodes:[0,3],order:1}] },
  'HF': { sym: 'HF', name: 'HYDROGEN FLUORIDE', hybrid: 'sp³', geom: 'Linear', struct: 'Covalent (Polar)', desc: 'Forms strong hydrogen bonds.', vis2D: 'H-F', atoms: [{element:'H',x:-0.5,y:0,z:0}, {element:'F',x:0.5,y:0,z:0}], bonds: [{nodes:[0,1],order:1}] },
  'B2H6': { sym: 'B₂H₆', name: 'DIBORANE', hybrid: 'sp³', geom: 'Bridged', struct: 'Electron-deficient', desc: 'Has 3-center-2-electron bonds.', vis2D: 'B2H6', atoms: [{element:'B',x:-0.8,y:0,z:0},{element:'B',x:0.8,y:0,z:0},{element:'H',x:0,y:0.8,z:0},{element:'H',x:0,y:-0.8,z:0},{element:'H',x:-1.4,y:0.8,z:0},{element:'H',x:-1.4,y:-0.8,z:0},{element:'H',x:1.4,y:0.8,z:0},{element:'H',x:1.4,y:-0.8,z:0}], bonds: [{nodes:[0,2],order:1},{nodes:[1,2],order:1},{nodes:[0,3],order:1},{nodes:[1,3],order:1},{nodes:[0,4],order:1},{nodes:[0,5],order:1},{nodes:[1,6],order:1},{nodes:[1,7],order:1}] },
  'H3O+': { sym: 'H₃O⁺', name: 'HYDRONIUM', hybrid: 'sp³', geom: 'Trigonal Pyramidal', struct: 'Ion', desc: 'Protonated water.', vis2D: 'H3O+', atoms: [{element:'O',x:0,y:0.2,z:0}, {element:'H',x:0,y:-0.5,z:0.8}, {element:'H',x:0.7,y:-0.5,z:-0.4}, {element:'H',x:-0.7,y:-0.5,z:-0.4}], bonds: [{nodes:[0,1],order:1},{nodes:[0,2],order:1},{nodes:[0,3],order:1}] },
  'OH-': { sym: 'OH⁻', name: 'HYDROXIDE', hybrid: 'sp³', geom: 'Linear', struct: 'Ion', desc: 'Base ion.', vis2D: 'O-H', atoms: [{element:'O',x:-0.4,y:0,z:0}, {element:'H',x:0.4,y:0,z:0}], bonds: [{nodes:[0,1],order:1}] },
  'C2H4': { sym: 'C₂H₄', name: 'ETHENE', hybrid: 'sp²', geom: 'Planar', struct: 'Covalent', desc: 'Simplest alkene.', vis2D: 'CH2=CH2', atoms: [{element:'C',x:-0.6,y:0,z:0},{element:'C',x:0.6,y:0,z:0},{element:'H',x:-1.2,y:0.8,z:0},{element:'H',x:-1.2,y:-0.8,z:0},{element:'H',x:1.2,y:0.8,z:0},{element:'H',x:1.2,y:-0.8,z:0}], bonds: [{nodes:[0,1],order:2},{nodes:[0,2],order:1},{nodes:[0,3],order:1},{nodes:[1,4],order:1},{nodes:[1,5],order:1}] },
  'C2H2': { sym: 'C₂H₂', name: 'ETHYNE', hybrid: 'sp', geom: 'Linear', struct: 'Covalent', desc: 'Simplest alkyne.', vis2D: 'CH≡CH', atoms: [{element:'C',x:-0.6,y:0,z:0},{element:'C',x:0.6,y:0,z:0},{element:'H',x:-1.4,y:0,z:0},{element:'H',x:1.4,y:0,z:0}], bonds: [{nodes:[0,1],order:3},{nodes:[0,2],order:1},{nodes:[1,3],order:1}] },
  'CH3OH': { sym: 'CH₃OH', name: 'METHANOL', hybrid: 'sp³', geom: 'Tetrahedral C', struct: 'Alcohol', desc: 'Wood alcohol.', vis2D: 'CH3-OH', atoms: [{element:'C',x:-0.5,y:-0.2,z:0},{element:'O',x:0.7,y:-0.2,z:0},{element:'H',x:-0.5,y:0.8,z:0},{element:'H',x:-1,y:-0.7,z:0.7},{element:'H',x:-1,y:-0.7,z:-0.7},{element:'H',x:1.2,y:0.5,z:0}], bonds: [{nodes:[0,1],order:1},{nodes:[0,2],order:1},{nodes:[0,3],order:1},{nodes:[0,4],order:1},{nodes:[1,5],order:1}] },
  'C2H5OH': { sym: 'C₂H₅OH', name: 'ETHANOL', hybrid: 'sp³', geom: 'Tetrahedral', struct: 'Alcohol', desc: 'Drinking alcohol.', vis2D: 'CH3-CH2-OH', atoms: [{element:'C',x:-1.2,y:0,z:0},{element:'C',x:0,y:0,z:0},{element:'O',x:1.2,y:0,z:0},{element:'H',x:-1.5,y:0.8,z:0.5},{element:'H',x:-1.5,y:-0.8,z:0.5},{element:'H',x:-1.5,y:0,z:-0.9},{element:'H',x:0,y:0.9,z:0},{element:'H',x:0,y:-0.9,z:0},{element:'H',x:1.7,y:0.6,z:0}], bonds: [{nodes:[0,1],order:1},{nodes:[1,2],order:1},{nodes:[0,3],order:1},{nodes:[0,4],order:1},{nodes:[0,5],order:1},{nodes:[1,6],order:1},{nodes:[1,7],order:1},{nodes:[2,8],order:1}] },
  'C3H8': { sym: 'C₃H₈', name: 'PROPANE', hybrid: 'sp³', geom: 'Tetrahedral', struct: 'Alkane', desc: 'LPG gas.', vis2D: 'C3H8', atoms: [{element:'C',x:-1.2,y:-0.3,z:0},{element:'C',x:0,y:0.4,z:0},{element:'C',x:1.2,y:-0.3,z:0},{element:'H',x:-1.5,y:-0.8,z:0.8},{element:'H',x:-1.5,y:-0.8,z:-0.8},{element:'H',x:-1.7,y:0.5,z:0},{element:'H',x:0,y:1,z:0.8},{element:'H',x:0,y:1,z:-0.8},{element:'H',x:1.5,y:-0.8,z:0.8},{element:'H',x:1.5,y:-0.8,z:-0.8},{element:'H',x:1.7,y:0.5,z:0}], bonds: [{nodes:[0,1],order:1},{nodes:[1,2],order:1},{nodes:[0,3],order:1},{nodes:[0,4],order:1},{nodes:[0,5],order:1},{nodes:[1,6],order:1},{nodes:[1,7],order:1},{nodes:[2,8],order:1},{nodes:[2,9],order:1},{nodes:[2,10],order:1}] },
  'CO': { sym: 'CO', name: 'CARBON MONOXIDE', hybrid: 'sp', geom: 'Linear', struct: 'Covalent', desc: 'Toxic gas with triple bond.', vis2D: 'C≡O', atoms: [{element:'C',x:-0.5,y:0,z:0},{element:'O',x:0.5,y:0,z:0}], bonds: [{nodes:[0,1],order:3}] },
  'CO2': { sym: 'CO₂', name: 'CARBON DIOXIDE', hybrid: 'sp', geom: 'Linear', struct: 'Covalent', desc: 'Greenhouse gas.', vis2D: 'O=C=O', atoms: [{element:'O',x:-1.2,y:0,z:0},{element:'C',x:0,y:0,z:0},{element:'O',x:1.2,y:0,z:0}], bonds: [{nodes:[0,1],order:2},{nodes:[1,2],order:2}] }
};

let js = fs.readFileSync('js/lab.js', 'utf8');

// Replace top data
let dataEnd = js.indexOf('let scene, camera');
let restOfJs = js.substring(dataEnd);

// Replace createBond in restOfJs to support order 3
let createBondOld = restOfJs.indexOf('function createBond');
let createBondEnd = restOfJs.indexOf('function drawMolecule');
if(createBondOld !== -1 && createBondEnd !== -1) {
  let newCreateBond = `function createBond(pos1, pos2, order) {
  const group = new THREE.Group();
  const solidMat = new THREE.MeshPhongMaterial({ color: 0x95a5a6 });
  
  const bondAxis = new THREE.Vector3().subVectors(pos2, pos1).normalize();
  let perp = new THREE.Vector3(0,1,0).cross(bondAxis);
  if (perp.lengthSq() < 0.01) {
    perp = new THREE.Vector3(1,0,0).cross(bondAxis);
  }
  perp.normalize().multiplyScalar(0.12);

  if (order === 1) {
    group.add(createCylinder(pos1, pos2, solidMat));
  } 
  else if (order === 2) {
    group.add(createCylinder(pos1.clone().add(perp), pos2.clone().add(perp), solidMat));
    group.add(createCylinder(pos1.clone().sub(perp), pos2.clone().sub(perp), solidMat));
  }
  else if (order === 3) {
    group.add(createCylinder(pos1, pos2, solidMat));
    group.add(createCylinder(pos1.clone().add(perp), pos2.clone().add(perp), solidMat));
    group.add(createCylinder(pos1.clone().sub(perp), pos2.clone().sub(perp), solidMat));
  }
  else if (order === 1.5) {
    group.add(createCylinder(pos1, pos2, solidMat));
    const dashedMat = new THREE.LineDashedMaterial({ color: 0x95a5a6, dashSize: 0.08, gapSize: 0.08, linewidth: 3 });
    const p1Offset = pos1.clone().add(perp);
    const p2Offset = pos2.clone().add(perp);
    const geometry = new THREE.BufferGeometry().setFromPoints([p1Offset, p2Offset]);
    const line = new THREE.Line(geometry, dashedMat);
    line.computeLineDistances();
    group.add(line);
  }
  return group;
}
`;
  restOfJs = restOfJs.substring(0, createBondOld) + newCreateBond + restOfJs.substring(createBondEnd);
}

const newDataString = `const atomColors = ${JSON.stringify(atomColors)};
const atomRadii = ${JSON.stringify(atomRadii)};
const compoundData = ${JSON.stringify(compounds, null, 2)};

`;

fs.writeFileSync('js/lab.js', newDataString + restOfJs);

// 2. UPDATE HTML SIDEBAR
let html = fs.readFileSync('hydrogen.html', 'utf8');
let sbStart = html.indexOf('<div class="compounds-sidebar">') + '<div class="compounds-sidebar">'.length;
let sbEnd = html.indexOf('<!-- Main Stage -->');

let sidebarHtml = '';
for (let key in compounds) {
  let c = compounds[key];
  let activeClass = key === 'H2O' ? ' active' : '';
  sidebarHtml += `
      <div class="comp-item${activeClass}" data-comp="${key}">
        <div class="comp-item-sym">${c.sym}</div>
        <div class="comp-item-name">${c.name}</div>
      </div>`;
}

html = html.substring(0, sbStart) + sidebarHtml + '\n    </div>\n\n    ' + html.substring(sbEnd);
fs.writeFileSync('hydrogen.html', html);

console.log("Compounds added!");
