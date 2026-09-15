const fs = require('fs');
let html = fs.readFileSync('hydrogen.html', 'utf8');

const newCSS = `/* Workspace Area */
  .workspace-area {
    padding: 80px 20px;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 10;
    border-top: 1px dashed var(--line);
  }
  
  .ws-title {
    font-family: 'Fraunces', serif;
    font-size: 32px;
    margin-bottom: 40px;
  }

  /* Sidebar Layout */
  .lab-container {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  .compounds-sidebar {
    width: 280px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .comp-item {
    background: var(--card);
    border: 1.5px solid var(--line);
    border-radius: 12px;
    padding: 14px 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: 0.2s var(--ease);
  }

  .comp-item:hover {
    transform: translateX(4px);
    border-color: var(--blue);
  }

  .comp-item.active {
    border-color: var(--blue);
    background: color-mix(in srgb, var(--blue) 8%, transparent);
    box-shadow: -4px 0 0 var(--blue);
  }

  .comp-item-sym {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    color: var(--ink);
    font-weight: 600;
    min-width: 48px;
  }

  .comp-item-name {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    color: var(--ink-soft);
    letter-spacing: 0.05em;
  }

  .comp-item.active .comp-item-name {
    color: var(--blue);
  }

  .visual-stage {
    flex-grow: 1;
    background: color-mix(in srgb, var(--card) 40%, transparent);
    border: 2px dashed var(--line);
    border-radius: 20px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px;
  }
`;

const newHTML = `<!-- WORKSPACE AREA -->
<section id="workspace" class="workspace-area">
  <h2 class="ws-title">Hydrogen Visual Lab</h2>
  
  <div class="lab-container">
    <!-- Left Sidebar -->
    <div class="compounds-sidebar">
      <div class="comp-item active">
        <div class="comp-item-sym">H₂</div>
        <div class="comp-item-name">DIHYDROGEN</div>
      </div>
      <div class="comp-item">
        <div class="comp-item-sym" style="color: var(--teal)">H₂O</div>
        <div class="comp-item-name">WATER</div>
      </div>
      <div class="comp-item">
        <div class="comp-item-sym" style="color: var(--amber)">D₂O</div>
        <div class="comp-item-name">HEAVY WATER</div>
      </div>
      <div class="comp-item">
        <div class="comp-item-sym" style="color: var(--verm)">H₂O₂</div>
        <div class="comp-item-name">HYDROGEN PEROXIDE</div>
      </div>
      <div class="comp-item">
        <div class="comp-item-sym" style="color: var(--green)">MHₓ</div>
        <div class="comp-item-name">HYDRIDES</div>
      </div>
    </div>

    <!-- Right Visual Stage -->
    <div class="visual-stage">
      <i data-lucide="microscope" style="width: 48px; height: 48px; color: var(--ink-soft); margin-bottom: 20px; opacity: 0.5;"></i>
      <h3 style="font-family: 'Fraunces', serif; font-size: 24px; color: var(--ink); margin-bottom: 12px;">3D / 2D Visual Stage</h3>
      <p style="font-family: 'Space Grotesk', sans-serif; font-size: 14px; color: var(--ink-soft); max-width: 400px; margin-bottom: 24px;">Compound ki detail aur visual interactive 3D model yahan render hoga jab user koi item select karega.</p>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; color: var(--blue); padding: 8px 16px; background: color-mix(in srgb, var(--blue) 10%, transparent); border-radius: 20px;">READY FOR INTEGRATION</p>
    </div>
  </div>
</section>`;

// Replace CSS
let startCss = html.indexOf('/* Workspace Area */');
let endCss = html.indexOf('</style>');
html = html.substring(0, startCss) + newCSS + html.substring(endCss);

// Replace HTML
let startHtml = html.indexOf('<!-- WORKSPACE AREA -->');
let endHtml = html.indexOf('</section>', startHtml) + '</section>'.length;
html = html.substring(0, startHtml) + newHTML + html.substring(endHtml);

fs.writeFileSync('hydrogen.html', html);
console.log("Updated hydrogen.html workspace layout");
