const fs = require('fs');
let js = fs.readFileSync('js/lab.js', 'utf8');
let jsonStr = js.substring(js.indexOf('const compoundData = ') + 21, js.indexOf('let scene, camera') - 2);
try {
  let data = JSON.parse(jsonStr);
  console.log("NH3:", data.NH3);
} catch(e) { console.log(e); }
