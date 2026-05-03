const fs = require('fs');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}
const files = walk('./src');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let needed = [];
  if (content.includes('useState(') || content.includes('useState<')) needed.push('useState');
  if (content.includes('useEffect(')) needed.push('useEffect');
  if (content.includes('useRef(') || content.includes('useRef<')) needed.push('useRef');
  if (f === './src/main.tsx' && content.includes('StrictMode')) needed.push('StrictMode');
  if (needed.length > 0) {
    if (!content.includes("from 'react'") && !content.includes('from "react"')) {
       content = "import { " + needed.join(', ') + " } from 'react';\n" + content;
       fs.writeFileSync(f, content);
    }
  }
});
