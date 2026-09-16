const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');
if (!css.includes('.toast {')) {
  css += `
/* Toast Notification */
.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: var(--card);
  color: var(--ink);
  padding: 12px 24px;
  border-radius: 50px;
  box-shadow: 0 10px 30px var(--shadow);
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 500;
  font-size: 14px;
  z-index: 10000;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--line);
}
.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}
.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--paper);
}
.toast-icon svg {
  width: 12px;
  height: 12px;
}
`;
  fs.writeFileSync('css/style.css', css);
}
console.log("Added toast CSS");
