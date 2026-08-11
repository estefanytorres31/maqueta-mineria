import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const electronDir = path.join(projectRoot, 'electron');

console.log('[fix-electron-ext] electronDir =', electronDir);

const pairs = [
  ['main.js', 'main.cjs'],
  ['preload.js', 'preload.cjs']
];

for (const [from, to] of pairs) {
  const src = path.join(electronDir, from);
  const dst = path.join(electronDir, to);
  if (fs.existsSync(src)) {
    try { fs.unlinkSync(dst); } catch {}
    fs.copyFileSync(src, dst);
    console.log(`[fix-electron-ext] ${from} -> ${to} (${fs.statSync(dst).size} bytes)`);
  } else {
    console.log(`[fix-electron-ext] WARN: ${from} not found in ${electronDir}`);
  }
}

console.log('[fix-electron-ext] DONE');
