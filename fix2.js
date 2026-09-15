const fs = require('fs');
let brokenHtml = fs.readFileSync('dashboard.html', 'utf8');

let splitPoint = brokenHtml.indexOf('<!DOCTYPE html>', 1);
if (splitPoint === -1) {
    console.log("No second DOCTYPE found, maybe already fixed?");
    process.exit(1);
}

let part1 = brokenHtml.substring(0, splitPoint);

let cleanHtml = fs.readFileSync('clean.html', 'utf8');
let groups12Index = cleanHtml.indexOf('          <p class="mono tsub">GROUPS 1 – 2</p>');

if (groups12Index === -1) {
    console.log("GROUPS 1-2 not found!");
    process.exit(1);
}

let tail = cleanHtml.substring(groups12Index);

const correctSBlockHeader = `      <!-- ========== IN·02 S-BLOCK ========== -->
      <article class="tile" data-ch="s" data-name="S-Block" style="--tc:var(--green);--tilt:1deg;--d:.15s" tabindex="0">
        <div class="t-top"><span class="no mono">IN·02</span><span class="t-ic"><i data-lucide="layers"></i></span></div>
        <div class="t-sym"><span class="gsym"><span style="--i:0">S</span></span></div>
        <div class="t-bot">
          <h3 class="tname">S-Block</h3><span class="tbar"></span>\n`;

let finalHtml = part1 + correctSBlockHeader + tail;
fs.writeFileSync('dashboard.html', finalHtml);
console.log("Fixed dashboard.html successfully.");
