const fs = require('fs');
let js = fs.readFileSync('js/lab.js', 'utf8');

js = js.replace(/"CH4": \{/g, '"CH4": { "hasAngle": true, "angleData": {"text": "109.5°"}, ');
js = js.replace(/"NH3": \{/g, '"NH3": { "hasAngle": true, "hasLP": true, "angleData": {"text": "107°"}, "lps": [{"x":0, "y":1.0, "z":0, "rx":0, "rz":0}], ');
js = js.replace(/"C2H4": \{/g, '"C2H4": { "hasAngle": true, "angleData": {"text": "120°"}, ');
js = js.replace(/"C2H2": \{/g, '"C2H2": { "hasAngle": true, "angleData": {"text": "180°"}, ');

fs.writeFileSync('js/lab.js', js);
