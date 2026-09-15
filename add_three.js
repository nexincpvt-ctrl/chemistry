const fs = require('fs');

let html = fs.readFileSync('hydrogen.html', 'utf8');

if (!html.includes('three.min.js')) {
    html = html.replace('<script src="js/lab.js"></script>', '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n<script src="js/lab.js"></script>');
}

fs.writeFileSync('hydrogen.html', html);
console.log('Added Three.js');
