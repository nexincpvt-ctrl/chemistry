const fs = require('fs');

let js = fs.readFileSync('js/lab.js', 'utf8');

js = js.replace(/btnAngle\.style\.display = [^;]+;/g, "btnAngle.style.display = is3D ? 'flex' : 'none';");
js = js.replace(/btnLP\.style\.display = [^;]+;/g, "btnLP.style.display = is3D ? 'flex' : 'none';");

function makeHydrideHTML(metalStr) {
  const hBracket = '<div style="position:relative; display:flex; align-items:center;">' +
    '<div style="border-left: 2px solid var(--ink); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); width: 8px; height: 55px; margin-right:12px;"></div>' +
    '<div style="display:flex; flex-direction:column; align-items:center;">' +
      '<span style="line-height:1; letter-spacing:4px; font-size:24px; margin-bottom:-5px;">..</span>' +
      '<span>H</span>' +
    '</div>' +
    '<div style="border-right: 2px solid var(--ink); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); width: 8px; height: 55px; margin-left:12px;"></div>' +
    '<sup style="position:absolute; right:-15px; top:-5px; color:var(--verm); font-size:18px; font-weight:bold;">-</sup>' +
  '</div>';

  if (metalStr === 'Ca2+' || metalStr === 'Mg2+') {
    const mName = metalStr.substring(0, 2);
    return '<div style="display:flex; align-items:center; gap: 30px; font-family:Fraunces,serif; font-size: 32px; font-weight:600; color:var(--ink);">' +
      hBracket +
      '<div>' + mName + '<sup style="color:var(--verm); font-size:20px; font-weight:bold;">2+</sup></div>' +
      hBracket +
    '</div>';
  } else {
    const mName = metalStr.substring(0, metalStr.length - 1);
    return '<div style="display:flex; align-items:center; gap: 30px; font-family:Fraunces,serif; font-size: 32px; font-weight:600; color:var(--ink);">' +
      '<div>' + mName + '<sup style="color:var(--verm); font-size:20px; font-weight:bold;">+</sup></div>' +
      hBracket +
    '</div>';
  }
}

js = js.replace(/"vis2D":\s*"Na⁺ H⁻"/g, '"vis2D": ' + JSON.stringify(makeHydrideHTML('Na+')));
js = js.replace(/"vis2D":\s*"Li⁺ H⁻"/g, '"vis2D": ' + JSON.stringify(makeHydrideHTML('Li+')));
js = js.replace(/"vis2D":\s*"H-Ca-H"/g, '"vis2D": ' + JSON.stringify(makeHydrideHTML('Ca2+')));
js = js.replace(/"vis2D":\s*"H-Mg-H"/g, '"vis2D": ' + JSON.stringify(makeHydrideHTML('Mg2+')));

fs.writeFileSync('js/lab.js', js);
console.log("Updated 2D structures and button logic");
