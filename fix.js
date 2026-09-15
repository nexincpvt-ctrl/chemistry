const fs = require('fs');
let html = fs.readFileSync('dashboard.html', 'utf8');

const sBlockIndex = html.indexOf('<!-- ========== IN·02 S-BLOCK ========== -->');
// Find the original grid start to replace
const hBlockStart = html.indexOf('<div class="tiles-grid">') + '<div class="tiles-grid">\n'.length;

const correctHBlock = `      <!-- ========== IN·01 HYDROGEN ========== -->
      <article class="tile" data-ch="h" data-name="Hydrogen" style="--tc:var(--blue);--tilt:-1.3deg;--d:.05s" tabindex="0">
        <div class="t-top"><span class="no mono">IN·01</span><span class="t-ic"><i data-lucide="flame"></i></span></div>
        <div class="t-sym"><span class="znum mono">1</span><span class="gsym"><span style="--i:0">H</span></span></div>
        <div class="t-bot">
          <h3 class="tname">Hydrogen</h3><span class="tbar"></span>
          <p class="mono tsub">THE UNIQUE ELEMENT</p>
          <span class="open-chip mono">CLICK TO EXPLORE <i data-lucide="arrow-right"></i></span>
        </div>
        <div class="t-members" aria-hidden="true">
          <div class="tm-head"><b>HYDROGEN</b><span>COMPOUNDS LAB</span></div>
          <div class="tm-grid t1" style="--step:.06s">
            <div class="tm-chip" style="--i:0" data-goto="hydrogen.html">
              <b>Explore Compounds</b>
              <span>Interactive 2D & 3D Visuals of Hydrogen compounds like H₂O, H₂O₂, etc.</span>
            </div>
          </div>
          <div class="tm-foot"><i data-lucide="sparkles"></i><span>VISUAL LAB IS LIVE</span></div>
        </div>
      </article>\n\n`;

// Extract S-Block to the end
let tail = html.substring(sBlockIndex);

// Reconstruct
html = html.substring(0, hBlockStart) + correctHBlock + tail;
fs.writeFileSync('dashboard.html', html);
