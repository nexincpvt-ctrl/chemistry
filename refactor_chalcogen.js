const fs = require('fs');

let html = fs.readFileSync('chalcogen.html', 'utf8');

// 1. Extract CSS
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
    fs.writeFileSync('css/chalcogen.css', styleMatch[1].trim());
    html = html.replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="css/chalcogen.css">');
}

// 2. Extract JS
const scriptMatch = html.match(/<script>\s*(\/\* ============================================================\s*NEXINC[\s\S]*?)<\/script>/);
if (scriptMatch) {
    let js = scriptMatch[1].trim();
    // Replace index.html fallback
    js = js.replace(/location\.href\s*=\s*'index\.html'/g, "location.href = 'dashboard.html'");
    // Fix backBtn logic. Sometimes it's a scrollTo, sometimes it's showToast
    js = js.replace(/\$\('#backBtn'\)\.addEventListener\('click',\s*\(\)\s*=>\s*.*?\);/g, 
      "$('#backBtn').addEventListener('click', () => location.href = 'group16.html');");
    
    // For toTop just in case it was accidentally caught
    if (!js.includes("('#toTop').addEventListener('click'")) {
        js += "\n$('#toTop').addEventListener('click', () => scrollTo({ top:0, behavior:'smooth' }));";
    }
    fs.writeFileSync('js/chalcogen.js', js);
    html = html.replace(/<script>\s*\/\* ============================================================\s*NEXINC[\s\S]*?<\/script>/, '<script src="js/chalcogen.js"></script>');
}

// 3. Update HTML Brand link
html = html.replace(/<a class="brand" href="#"/g, '<a class="brand" href="dashboard.html"');

// 4. Add Back link to header if not present
const brandEnd = html.indexOf('</a>', html.indexOf('<a class="brand"'));
if (brandEnd !== -1 && html.indexOf('margin-left: 20px; color: var(--ink-soft); transition: color 0.3s;"') === -1) {
  const insertStr = `\n  <a href="group16.html" class="mono" style="font-size: 11px; letter-spacing: 0.15em; margin-left: 20px; color: var(--ink-soft); transition: color 0.3s;" onmouseover="this.style.color='var(--ink)'" onmouseout="this.style.color='var(--ink-soft)'">← GROUP 16</a>`;
  html = html.substring(0, brandEnd + 4) + insertStr + html.substring(brandEnd + 4);
}

// 5. Save back to chalcogen.html
fs.writeFileSync('chalcogen.html', html);

// 6. Update group16.html to point to chalcogen.html
let g16 = fs.readFileSync('group16.html', 'utf8');
g16 = g16.replace(/<article class="tile" data-ch="chalc" data-name="CHALCOGENS"(.*?)>/g, '<article class="tile" data-ch="chalc" data-name="CHALCOGENS" data-goto="chalcogen.html"$1>');
fs.writeFileSync('group16.html', g16);

console.log('Done refactoring chalcogen.html!');
