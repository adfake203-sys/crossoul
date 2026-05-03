const fs = require('fs');
let content = fs.readFileSync('src/index.css', 'utf8');

// Find the start of the bad block (around "/* Waitlist modal */")
// Or just slice it by lines since I know it's at the end
let lines = content.split('\n');

// The bad block starts at line 384 (index 383)
lines = lines.slice(0, 383);

const cleanCSS = `
/* Waitlist modal */
.wl-box { background: #111; border: 1px solid rgba(255,255,255,.1); border-radius: 22px; padding: 2.8rem; max-width: 460px; width: 100%; text-align: center; box-shadow: 0 40px 80px rgba(0,0,0,.8); position: relative; }
.wl-title { font-family: var(--fh); font-size: 1.9rem; font-weight: 900; letter-spacing: -1px; margin-bottom: .4rem; }
.wl-sub { color: var(--muted); font-size: .9rem; margin-bottom: 2rem; line-height: 1.5; }
.wl-in { width: 100%; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 11px; padding: .85rem 1.15rem; color: #fff; font-size: .98rem; outline: none; margin-bottom: .8rem; font-family: var(--fb); transition: border-color .2s; }
.wl-in:focus { border-color: rgba(255,255,255,.35); }
.wl-in::placeholder { color: #52525b; }
.wl-sub-btn { width: 100%; background: #fff; color: #000; border: none; border-radius: 11px; padding: .95rem; font-size: .98rem; font-weight: 700; font-family: var(--fh); cursor: pointer; letter-spacing: .4px; transition: all .2s; }
.wl-sub-btn:hover { background: #e4e4e7; transform: translateY(-1px); }
.wl-close { position: absolute; top: 1.3rem; right: 1.3rem; background: none; border: none; color: var(--muted); font-size: 1.4rem; cursor: pointer; line-height: 1; }
.wl-msg { margin-top: .9rem; font-size: .82rem; min-height: 1.2em; color: #a3e635; }
`;

fs.writeFileSync('src/index.css', lines.join('\n') + cleanCSS);
console.log('CSS Fixed');
