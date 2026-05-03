const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

const optimizations = `
/* ══════════════════════════════
   PERFORMANCE & SMOOTHNESS TWEAKS
   ══════════════════════════════ */
html { text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }
.mesh, .grain { will-change: transform; transform: translateZ(0); }
.fiu, .j-item { will-change: opacity, transform; transform: translateZ(0); }
#cur, #cur2 { will-change: transform; pointer-events: none; }
nav, #pill { will-change: transform, backdrop-filter; transform: translateZ(0); }
`;

fs.writeFileSync('src/index.css', css + optimizations);
console.log('CSS optimized');
