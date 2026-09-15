const fs = require('fs');

let html = fs.readFileSync('hydrogen.html', 'utf8');

// Include css/lab.css
if (!html.includes('<link rel="stylesheet" href="css/lab.css">')) {
  html = html.replace('<link rel="stylesheet" href="css/style.css">', '<link rel="stylesheet" href="css/style.css">\n<link rel="stylesheet" href="css/lab.css">');
}

// Remove the old inline styles for workspace (from /* Workspace Area */ down to </style>)
const cssStart = html.indexOf('/* Workspace Area */');
const cssEnd = html.indexOf('</style>', cssStart);
if (cssStart !== -1 && cssEnd !== -1) {
  html = html.substring(0, cssStart) + html.substring(cssEnd);
}

// Remove old inline script
const scriptStart = html.indexOf('// Sidebar Click Logic');
const scriptEnd = html.indexOf('</script>', scriptStart);
if (scriptStart !== -1 && scriptEnd !== -1) {
  html = html.substring(0, scriptStart - 10) + html.substring(scriptEnd);
}

// Replace workspace HTML
const startArea = html.indexOf('<!-- WORKSPACE AREA -->');
const endArea = html.indexOf('</section>', startArea) + 10;
const newHtml = `<!-- WORKSPACE AREA -->
<section id="workspace" class="workspace-area">
  <h2 class="ws-title">Hydrogen Visual Lab</h2>
  
  <div class="lab-wrapper" id="labWrapper">
    <!-- Left Sidebar -->
    <div class="compounds-sidebar">
      <div class="comp-item" data-comp="H2">
        <div class="comp-item-sym">H₂</div>
        <div class="comp-item-name">DIHYDROGEN</div>
      </div>
      <div class="comp-item active" data-comp="H2O">
        <div class="comp-item-sym" style="color: var(--teal)">H₂O</div>
        <div class="comp-item-name">WATER</div>
      </div>
      <div class="comp-item" data-comp="D2O">
        <div class="comp-item-sym" style="color: var(--amber)">D₂O</div>
        <div class="comp-item-name">HEAVY WATER</div>
      </div>
      <div class="comp-item" data-comp="H2O2">
        <div class="comp-item-sym" style="color: var(--verm)">H₂O₂</div>
        <div class="comp-item-name">PEROXIDE</div>
      </div>
      <div class="comp-item" data-comp="MHx">
        <div class="comp-item-sym" style="color: var(--green)">MHₓ</div>
        <div class="comp-item-name">HYDRIDES</div>
      </div>
    </div>

    <!-- Main Stage -->
    <div class="visual-stage">
      <div class="lab-toolbar">
        <div class="toolbar-left">
          <button class="lab-btn active" id="btn2D3D"><i data-lucide="cuboid"></i> 3D MODE</button>
          <button class="lab-btn" id="btnAngle"><i data-lucide="spline"></i> ANGLE</button>
          <button class="lab-btn" id="btnLP"><i data-lucide="cloud-fog"></i> LONE PAIR</button>
        </div>
        <div class="toolbar-right">
          <button class="lab-btn" id="btnFS"><i data-lucide="maximize"></i> FULL SCREEN</button>
        </div>
      </div>
      
      <div class="render-area" id="renderArea">
        <!-- Molecule renders here -->
      </div>
    </div>

    <!-- Right Info Sidebar -->
    <div class="info-sidebar">
      <h3 class="info-head" id="infoSym">H₂O</h3>
      
      <div class="info-group">
        <label>HYBRIDIZATION</label>
        <div class="info-val" id="infoHybrid">sp³</div>
      </div>
      
      <div class="info-group">
        <label>GEOMETRY</label>
        <div class="info-val" id="infoGeom">Bent / V-shaped</div>
      </div>
      
      <div class="info-group">
        <label>STRUCTURE</label>
        <div class="info-val" id="infoStruct">Covalent (Polar)</div>
      </div>
      
      <div class="info-group">
        <label>QUICK FACTS</label>
        <div class="info-val" id="infoDesc" style="font-size: 13px; color: var(--ink-soft);">Universal solvent with strong intermolecular hydrogen bonding.</div>
      </div>
    </div>
  </div>
</section>
`;
html = html.substring(0, startArea) + newHtml + html.substring(endArea);

// Add script link
if (!html.includes('<script src="js/lab.js"></script>')) {
  html = html.replace('</body>', '<script src="js/lab.js"></script>\n</body>');
}

fs.writeFileSync('hydrogen.html', html);
console.log('Updated hydrogen.html');
