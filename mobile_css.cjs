const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// 1. Fix Pill layout for mobile
css = css.replace(
  '#pill{bottom:.9rem;gap:.15rem;padding:.2rem;max-width:calc(100vw - 2rem)}',
  '#pill{bottom:.9rem;gap:.15rem;padding:.2rem;width:calc(100vw - 2rem);justify-content:center}'
);

css = css.replace(
  '.pb{padding:.55rem .85rem;font-size:.68rem;gap:.35rem;letter-spacing:.4px;min-height:40px}',
  '.pb{padding:.55rem .3rem;font-size:.65rem;gap:.25rem;letter-spacing:.2px;min-height:40px;flex:1;justify-content:center}'
);

// 2. Fix Lag (Remove blur filter and SVG grain on mobile, reduce backdrop-filter)
const optimizations = `
@media (max-width: 768px) {
  /* Disable heavy SVG grain and blur filters on mobile */
  .grain { display: none !important; }
  .mesh { filter: none !important; opacity: 0.6; }
  
  /* Reduce backdrop-filter cost */
  nav, #pill, .prob-sol { 
    backdrop-filter: blur(8px) !important; 
    -webkit-backdrop-filter: blur(8px) !important; 
  }
}
`;

fs.writeFileSync('src/index.css', css + optimizations);
console.log('Mobile optimizations applied');
