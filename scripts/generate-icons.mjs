import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const src = path.resolve('public/icons/app-icon.svg');
const out = path.resolve('public/icons');
await fs.mkdir(out, { recursive: true });
const svg = await fs.readFile(src);
for (const size of [192, 512]) await sharp(svg).resize(size, size).png().toFile(path.join(out, `icon-${size}.png`));
console.log('Generated MOI MARKET PRO icons (192px and 512px).');
