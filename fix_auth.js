const fs = require('fs');
let css = fs.readFileSync('css/auth.css', 'utf8');

const regex = /\.loading-overlay \{[\s\S]*?top: 50%;/;
const replacement = `.loading-overlay {
    position: fixed;
    inset: 0;
    background: var(--paper);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
}

.loading-overlay.active {
    opacity: 1;
    pointer-events: all;
}

.load-line {
    width: 100%;
    height: 1.5px;
    position: relative;
    display: flex;
    align-items: center;
}

.load-line::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;`;

css = css.replace(regex, replacement);
fs.writeFileSync('css/auth.css', css);
console.log('Fixed auth.css');
