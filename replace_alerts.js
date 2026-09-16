const fs = require('fs');

const toastFn = `
function showToast(message) {
    let toast = document.getElementById('custom-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'custom-toast';
        toast.className = 'toast';
        toast.innerHTML = \`<div class="toast-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div><span class="toast-msg"></span>\`;
        document.body.appendChild(toast);
    }
    toast.querySelector('.toast-msg').textContent = message;
    
    // Reset animation if already showing
    toast.classList.remove('show');
    void toast.offsetWidth; // trigger reflow
    toast.classList.add('show');
    
    if (window.toastTimeout) clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
`;

function processFile(filename) {
    let js = fs.readFileSync(filename, 'utf8');
    if (!js.includes('function showToast')) {
        js = toastFn + '\\n' + js;
    }
    js = js.replace(/alert\((.+?)\);/g, 'showToast($1);');
    fs.writeFileSync(filename, js);
    console.log("Processed " + filename);
}

processFile('js/auth.js');
processFile('js/dashboard.js');
