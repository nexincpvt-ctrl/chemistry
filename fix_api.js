const fs = require('fs');

['api/login.js', 'api/signup.js', 'api/google-login.js', 'api/update-profile.js'].forEach(file => {
  try {
    let code = fs.readFileSync(file, 'utf8');
    code = code.replace('export default async function handler', 'module.exports = async function handler');
    fs.writeFileSync(file, code);
    console.log('Fixed:', file);
  } catch(e) {
    console.log('Skip:', file, e.message);
  }
});
