// Render og.png (1200×630) from copy.json + the 16kg handle dot plot. Run with any node_modules that has sharp:
//   NODE_PATH=/path/to/node_modules node og.mjs
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
const copy = JSON.parse(fs.readFileSync(new URL('./copy.json', import.meta.url)));
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

const words = copy.h1.split(' '); const lines = []; let cur = '';
for (const w of words) { if ((cur + ' ' + w).trim().length > 15) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; }
lines.push(cur.trim());

// 16kg handle diameters, mm. Keep in step with data.js.
const rows = [['Rogue', 38.1, 1], ['Fringe Prime', 37.8, 1], ['Competition bells', 35, 1], ['American Barbell', 34, 0], ['REP, Giant', 33, 0]];
const X0 = 660, W = 470, x = v => X0 + (v - 30) / 10 * W;
const refs = [[33, '#8a2416', 'REP 16'], [35, '#62615a', 'Titan'], [38, '#5b3a8c', 'KBK 20']];
const chart = refs.map(([v, c, l]) => `<line x1="${x(v)}" y1="150" x2="${x(v)}" y2="540" stroke="${c}" stroke-width="2" stroke-dasharray="6 5"/>
  <text x="${x(v)}" y="118" text-anchor="middle" font-family="Helvetica, Arial" font-size="19" fill="${c}">${v}mm</text>
  <text x="${x(v)}" y="140" text-anchor="middle" font-family="Helvetica, Arial" font-size="15" fill="${c}">${l}</text>`).join('')
 + rows.map(([l, v, ok], i) => { const y = 200 + i * 76;
  return `<text x="${X0}" y="${y - 14}" font-family="Helvetica, Arial" font-size="21" fill="#191917" stroke="#efeeea" stroke-width="7" paint-order="stroke" stroke-linejoin="round">${l} · ${v}mm</text>
  <rect x="${X0}" y="${y + 4}" width="${W}" height="2" fill="#d0cec6"/>
  <circle cx="${x(v)}" cy="${y + 5}" r="10" fill="${ok ? '#2f6b45' : '#8a2416'}" stroke="#efeeea" stroke-width="3"/>`; }).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#efeeea"/>
  <rect y="618" width="1200" height="12" fill="#5b3a8c"/>
  <text x="60" y="90" font-family="Helvetica, Arial" font-size="22" letter-spacing="3" fill="#62615a">A SHOPPING LOOKBOOK</text>
  ${lines.map((l, i) => `<text x="60" y="${200 + i * 74}" font-family="Georgia, serif" font-weight="bold" font-size="62" fill="#191917">${esc(l)}</text>`).join('')}
  <text x="60" y="520" font-family="Helvetica, Arial" font-size="22" fill="#62615a">Handle diameter at 16kg</text>
  <text x="60" y="560" font-family="Helvetica, Arial" font-size="24" fill="#62615a">drewhoover.com/kettlebell-lookbook</text>
  ${chart}
</svg>`;
await sharp(Buffer.from(svg)).png().toFile(new URL('./og.png', import.meta.url).pathname);
console.log('wrote og.png');
