const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let oldScript = '<script src="https://accounts.google.com/gsi/client" async defer></script>';
let newScript = '<script src="https://accounts.google.com/gsi/client?onload=initGoogle" async defer></script>';
html = html.replace(oldScript, newScript);
fs.writeFileSync('index.html', html);
console.log("Updated index.html");
