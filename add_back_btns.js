const fs = require('fs');

const files = [
  { name: 'group16.html', link: 'dashboard.html', text: '← DASHBOARD' },
  { name: 'hydride.html', link: 'group16.html', text: '← GROUP 16' },
  { name: 'oxides.html',  link: 'group16.html', text: '← GROUP 16' },
  { name: 'halides.html', link: 'group16.html', text: '← GROUP 16' }
];

for (let file of files) {
  let html = fs.readFileSync(file.name, 'utf8');
  
  // Find the closing tag of brand </a>
  const brandEnd = html.indexOf('</a>', html.indexOf('<a class="brand"'));
  if (brandEnd !== -1 && html.indexOf(file.text) === -1) {
    const insertStr = `\n  <a href="${file.link}" class="mono" style="font-size: 11px; letter-spacing: 0.15em; margin-left: 20px; color: var(--ink-soft); transition: color 0.3s;" onmouseover="this.style.color='var(--ink)'" onmouseout="this.style.color='var(--ink-soft)'">${file.text}</a>`;
    html = html.substring(0, brandEnd + 4) + insertStr + html.substring(brandEnd + 4);
    fs.writeFileSync(file.name, html);
    console.log(`Updated ${file.name}`);
  }
}
