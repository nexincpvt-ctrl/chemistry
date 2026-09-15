const fs = require('fs');
let js = fs.readFileSync('js/auth.js', 'utf8');

// Remove the window.initGoogle block from inside DOMContentLoaded
const blockToRemove = 'window.initGoogle = function () {\n        if (window.google) {\n            google.accounts.id.initialize({\n                client_id: \'428240791571-o7vohrjlnbctiu3k0ap60cpb19psvg3u.apps.googleusercontent.com\',\n                callback: handleGoogleLogin\n            });\n            google.accounts.id.renderButton(\n                document.getElementById(\'googleButtonContainer\'),\n                { theme: \'outline\', size: \'large\', width: 340, shape: \'rectangular\', logo_alignment: \'center\' }\n            );\n        }\n    };\\n    if(window.google) window.initGoogle();\\n';

js = js.replace(blockToRemove, '');

// Add global initGoogle function at the very top, before DOMContentLoaded
const globalFn = `/* ============================================================
   NEXINC — AUTH LOGIC
   ============================================================ */

// Global scope - needed for Google SDK onload callback
function handleGoogleLoginGlobal(response) {
  window._pendingGoogleResponse = response;
  const event = new CustomEvent('google-login', { detail: response });
  window.dispatchEvent(event);
}

window.initGoogle = function () {
  const btn = document.getElementById('googleButtonContainer');
  if (!btn) return;
  if (window.google) {
    google.accounts.id.initialize({
      client_id: '428240791571-o7vohrjlnbctiu3k0ap60cpb19psvg3u.apps.googleusercontent.com',
      callback: handleGoogleLoginGlobal
    });
    google.accounts.id.renderButton(btn, {
      theme: 'outline', size: 'large', width: 340,
      shape: 'rectangular', logo_alignment: 'center'
    });
  }
};

`;

js = js.replace('/* ============================================================\n   NEXINC — AUTH LOGIC\n   ============================================================ */\n', globalFn);

fs.writeFileSync('js/auth.js', js);
console.log("Done - moved initGoogle to global scope");
