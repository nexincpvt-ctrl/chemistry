const fs = require('fs');

let js = fs.readFileSync('js/auth.js', 'utf8');

const oldGoogle = '    window.onload = function () {\\n' +
'        if (window.google) {\\n' +
'            google.accounts.id.initialize({\\n' +
'                client_id: \\'428240791571-o7vohrjlnbctiu3k0ap60cpb19psvg3u.apps.googleusercontent.com\\',\\n' +
'                callback: handleGoogleLogin\\n' +
'            });\\n' +
'            google.accounts.id.renderButton(\\n' +
'                document.getElementById(\\'googleButtonContainer\\'),\\n' +
'                { theme: \\'outline\\', size: \\'large\\', width: 340, shape: \\'rectangular\\', logo_alignment: \\'center\\' }\\n' +
'            );\\n' +
'        }\\n' +
'    };';

const newGoogle = '    window.initGoogle = function () {\\n' +
'        if (window.google) {\\n' +
'            google.accounts.id.initialize({\\n' +
'                client_id: \\'428240791571-o7vohrjlnbctiu3k0ap60cpb19psvg3u.apps.googleusercontent.com\\',\\n' +
'                callback: handleGoogleLogin\\n' +
'            });\\n' +
'            google.accounts.id.renderButton(\\n' +
'                document.getElementById(\\'googleButtonContainer\\'),\\n' +
'                { theme: \\'outline\\', size: \\'large\\', width: 340, shape: \\'rectangular\\', logo_alignment: \\'center\\' }\\n' +
'            );\\n' +
'        }\\n' +
'    };\\n' +
'    if (window.google) { window.initGoogle(); }';

js = js.replace(oldGoogle, newGoogle);
fs.writeFileSync('js/auth.js', js);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('<script src="https://accounts.google.com/gsi/client" async defer></script>', '<script src="https://accounts.google.com/gsi/client?onload=initGoogle" async defer></script>');
fs.writeFileSync('index.html', html);

console.log("Fixed Google Sign In race condition");
