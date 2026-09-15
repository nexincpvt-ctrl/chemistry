const fs = require('fs');
let content = fs.readFileSync('js/script.js', 'utf8');
content = content.replace("$('#navCh').addEventListener", "$('#navCh')?.addEventListener");
content = content.replace("$('#toTop').addEventListener", "$('#toTop')?.addEventListener");
fs.writeFileSync('js/script.js', content);
