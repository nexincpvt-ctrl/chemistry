const fs = require('fs');
let js = fs.readFileSync('js/lab.js', 'utf8');

// FIX 1: atomMeshes should store the whole sphere mesh, not just position
// But angle code tries to access .position on it — so we need consistent approach.
// Since bonds already use atomMeshes as Vector3, let's keep it as Vector3 
// and fix the angle code to NOT do .position (since it's already a Vector3)

js = js.replace(
  'const v1 = new THREE.Vector3().subVectors(p1.position, pCenter.position).normalize();',
  'const v1 = new THREE.Vector3().subVectors(p1, pCenter).normalize();'
);
js = js.replace(
  'const v2 = new THREE.Vector3().subVectors(p2.position, pCenter.position).normalize();',
  'const v2 = new THREE.Vector3().subVectors(p2, pCenter).normalize();'
);
js = js.replace(
  'arcLine.position.copy(pCenter.position)',
  'arcLine.position.copy(pCenter)'
);
js = js.replace(
  'lbl.position.copy(pCenter.position).add(bisector.multiplyScalar(arcRadius + 0.3));',
  'lbl.position.copy(pCenter).add(bisector.multiplyScalar(arcRadius + 0.3));'
);

// FIX 2: Add missing atom colors/radii for S and Cl
if (!js.includes('"S"')) {
  js = js.replace(
    '"F":52937,',
    '"F":52937,"S":15792399,"Cl":3394611,"N":623843,'
  );
}
if (!js.includes('"S":0')) {
  js = js.replace(
    '"F":0.35,',
    '"F":0.35,"S":0.6,"Cl":0.55,'
  );
}

fs.writeFileSync('js/lab.js', js);
console.log('Fixed atomMeshes access');

// verify
require('child_process').execSync('node --check js/lab.js', { stdio: 'inherit' });
console.log('Syntax OK');
