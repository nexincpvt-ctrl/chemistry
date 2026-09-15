const fs = require('fs');

// 1. UPDATE CSS
let css = fs.readFileSync('css/lab.css', 'utf8');
css += `

/* Fullscreen Body Overrides */
body.fullscreen-active { overflow: hidden; }
body.fullscreen-active .site-head, body.fullscreen-active .hydro-hero { display: none !important; }

.fs-close-btn { 
  display: none; 
  position: absolute; 
  top: 16px; 
  right: 24px; 
  width: 44px; 
  height: 44px; 
  background: var(--card); 
  border: 1.5px solid var(--line); 
  border-radius: 50%; 
  align-items: center; 
  justify-content: center; 
  cursor: pointer; 
  z-index: 9999999; 
  color: var(--verm); 
  transition: 0.2s; 
}
.fs-close-btn:hover { background: var(--verm); color: var(--paper); }
body.fullscreen-active .fs-close-btn { display: flex; }
`;
fs.writeFileSync('css/lab.css', css);

// 2. UPDATE HTML (add cross button in lab-wrapper)
let html = fs.readFileSync('hydrogen.html', 'utf8');
if (!html.includes('fs-close-btn')) {
  html = html.replace('<div class="lab-wrapper" id="labWrapper">', '<div class="lab-wrapper" id="labWrapper">\n    <button class="fs-close-btn" id="btnFSClose" aria-label="Close Fullscreen"><i data-lucide="x"></i></button>');
  fs.writeFileSync('hydrogen.html', html);
}
