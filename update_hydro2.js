const fs = require('fs');
let html = fs.readFileSync('hydrogen.html', 'utf8');

const newHeader = `<header class="site-head">
  <a class="brand" href="dashboard.html" aria-label="NexInc home">
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 2 L24.5 8 V20 L14 26 L3.5 20 V8 Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M9.5 18.5 V9.5 L18.5 18.5 V9.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="21.5" cy="6.5" r="2.4" style="fill:var(--verm)"/>
    </svg>
    <span class="bname">Nex<em>Inc</em></span>
  </a>
  <nav style="display: flex; align-items: center; gap: 20px;">
    <a href="dashboard.html" class="mono nav-link">← ALL SECTIONS</a>
    <button class="theme-btn" id="themeBtn" aria-label="Theme badlo">
      <i class="ic-sun" data-lucide="sun"></i>
      <i class="ic-moon" data-lucide="moon"></i>
    </button>
  </nav>
  <div class="head-right">
    <span class="mono head-tag">HYDROGEN · VISUAL LAB</span>
    <!-- User Profile Dropdown / Button -->
    <div class="user-profile-nav" id="userProfileBtn" title="Profile">
      <div class="user-avatar" id="navAvatar">U</div>
      <span class="user-name-label" id="navName">User</span>
    </div>
  </div>
</header>`;

// Replace header
let startHeader = html.indexOf('<header class="site-head">');
let endHeader = html.indexOf('</header>') + '</header>'.length;
html = html.substring(0, startHeader) + newHeader + html.substring(endHeader);

// Add js/dashboard.js inclusion and click logic for sidebar
const scriptsToAdd = `
<script src="js/dashboard.js"></script>
<script>
  // Sidebar Click Logic
  const compItems = document.querySelectorAll('.comp-item');
  const visualStage = document.querySelector('.visual-stage');

  compItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all
      compItems.forEach(i => i.classList.remove('active'));
      // Add active class to clicked
      item.classList.add('active');
      
      const compName = item.querySelector('.comp-item-name').textContent;
      const compSym = item.querySelector('.comp-item-sym').textContent;

      // Update Visual Stage Placeholder
      visualStage.innerHTML = \`
        <i data-lucide="box" style="width: 48px; height: 48px; color: var(--blue); margin-bottom: 20px;"></i>
        <h3 style="font-family: 'Fraunces', serif; font-size: 28px; color: var(--ink); margin-bottom: 12px;">\${compSym}</h3>
        <p style="font-family: 'Space Grotesk', sans-serif; font-size: 16px; color: var(--ink-soft); max-width: 400px; margin-bottom: 24px;">Displaying interactive view for \${compName}.</p>
        <p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; color: var(--blue); padding: 8px 16px; background: color-mix(in srgb, var(--blue) 10%, transparent); border-radius: 20px;">READY FOR INTEGRATION</p>
      \`;
      
      if (window.lucide) lucide.createIcons();
    });
  });
</script>
</body>`;

html = html.replace('</body>', scriptsToAdd);

fs.writeFileSync('hydrogen.html', html);
console.log("Updated header and added click logic");
