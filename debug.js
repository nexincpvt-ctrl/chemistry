const fs = require('fs');
const acorn = require('acorn'); // Acorn is usually available or we can just use a simple stack

const js = fs.readFileSync('js/lab.js', 'utf8');

let stack = [];
let lines = js.split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  // Simple heuristic, ignores comments/strings for a quick check
  for (let j = 0; j < line.length; j++) {
    let char = line[j];
    if (char === '{' || char === '(' || char === '[') {
      stack.push({ char, line: i + 1 });
    } else if (char === '}' || char === ')' || char === ']') {
      if (stack.length > 0) {
        let last = stack[stack.length - 1].char;
        if ((char === '}' && last === '{') || 
            (char === ')' && last === '(') || 
            (char === ']' && last === '[')) {
          stack.pop();
        }
      }
    }
  }
}

console.log("Unclosed items:");
console.log(stack);
