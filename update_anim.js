const fs = require('fs');

let js = fs.readFileSync('js/lab.js', 'utf8');

const animStart = js.indexOf('function animate() {');
const animEnd = js.indexOf('}', animStart) + 1;

if (animStart !== -1) {
  const newAnim = `function animate() {
  animationId = requestAnimationFrame(animate);
  if (moleculeGroup) {
    if (autoRotate) {
      moleculeGroup.rotation.y += 0.01;
      moleculeGroup.rotation.x += 0.005;
    }
    moleculeGroup.children.forEach(child => {
      if (child.userData && child.userData.radius && child.children.length > 0) {
        const sprite = child.children[0];
        const localCamPos = camera.position.clone();
        child.worldToLocal(localCamPos);
        localCamPos.normalize().multiplyScalar(child.userData.radius + 0.02);
        sprite.position.copy(localCamPos);
      }
    });
  }
  renderer.render(scene, camera);
}`;

  js = js.substring(0, animStart) + newAnim + js.substring(animEnd);
  fs.writeFileSync('js/lab.js', js);
  console.log("Updated animate function");
} else {
  console.log("Could not find animate function");
}
