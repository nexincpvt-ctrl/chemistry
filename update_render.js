const fs = require('fs');

let js = fs.readFileSync('js/lab.js', 'utf8');

const drawAngleCode = `
  if (showAngle && data.angleData) {
    if (data.angleData.nodes) {
      const pCenter = atomMeshes[data.angleData.nodes[1]];
      const p1 = atomMeshes[data.angleData.nodes[0]];
      const p2 = atomMeshes[data.angleData.nodes[2]];
      
      const v1 = new THREE.Vector3().subVectors(p1, pCenter).normalize();
      const v2 = new THREE.Vector3().subVectors(p2, pCenter).normalize();
      
      // Calculate bisector for label position
      let bisector = new THREE.Vector3().addVectors(v1, v2).normalize();
      
      // Handle 180 degree angles (Linear) where bisector would be 0
      if (bisector.lengthSq() < 0.001) {
          bisector = new THREE.Vector3(0, 1, 0).cross(v1).normalize();
          if (bisector.lengthSq() < 0.001) {
              bisector = new THREE.Vector3(1, 0, 0).cross(v1).normalize();
          }
      }
      
      const arcRadius = 0.6;
      
      // Draw Arc (only if not 180 degrees)
      const angle = v1.angleTo(v2);
      if (angle < Math.PI - 0.01) {
          const curve = new THREE.EllipseCurve(
            0, 0, arcRadius, arcRadius,
            0, angle, false, 0
          );
          const points = curve.getPoints(20);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, linewidth: 2 });
          const arcLine = new THREE.Line(geometry, material);
          
          // Align arc with the vectors
          const normal = new THREE.Vector3().crossVectors(v1, v2).normalize();
          // We need to construct a rotation matrix from the XY plane to the v1,v2 plane
          const xAxis = v1.clone();
          const yAxis = new THREE.Vector3().crossVectors(normal, xAxis).normalize();
          const matrix = new THREE.Matrix4().makeBasis(xAxis, yAxis, normal);
          
          arcLine.applyMatrix4(matrix);
          arcLine.position.copy(pCenter);
          moleculeGroup.add(arcLine);
      }
      
      // Add label
      const lbl = createTextSprite(data.angleData.text);
      lbl.position.copy(pCenter).add(bisector.multiplyScalar(arcRadius + 0.3));
      moleculeGroup.add(lbl);
    } else {
      // Fallback if no nodes defined
      const lbl = createTextSprite(data.angleData.text);
      lbl.position.set(0, 1.0, 0);
      moleculeGroup.add(lbl);
    }
  }
`;

js = js.replace(/if\s*\(showAngle\s*&&\s*data\.angleData\)\s*\{[\s\S]*?moleculeGroup\.add\(lbl\);\s*\}/, drawAngleCode.trim());

// Also update animation for floating effect
const oldAnim = `    if (autoRotate) {
      moleculeGroup.rotation.y += 0.01;
      moleculeGroup.rotation.x += 0.005;
    }`;
const newAnim = `    if (autoRotate) {
      moleculeGroup.rotation.y += 0.01;
      moleculeGroup.rotation.x += 0.005;
    }
    // Bobbing animation
    moleculeGroup.position.y = Math.sin(Date.now() * 0.0015) * 0.15;`;

js = js.replace(oldAnim, newAnim);

fs.writeFileSync('js/lab.js', js);
console.log("Updated angle rendering and animation.");
