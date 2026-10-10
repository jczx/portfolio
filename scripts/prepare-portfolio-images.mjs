import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

await mkdir(new URL('../public/images/', import.meta.url), { recursive: true });
const portrait = new URL('../src/assets/julio_colour_blackedout.png', import.meta.url);
for (const width of [480, 800, 1254]) {
  const target = new URL(`../public/images/julio-${width}.webp`, import.meta.url);
  const result = await sharp(await readFile(portrait))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(fileURLToPath(target));
  console.log(`Portrait ${width}px: ${(result.size / 1024).toFixed(1)} KB`);
}

const homeSvg = await readFile(new URL('../public/og-image.svg', import.meta.url));
await sharp(homeSvg).resize(1200, 630).png().toFile(fileURLToPath(new URL('../public/og-image.png', import.meta.url)));
const previews = [
  { file: 'sanctions-matcher-preview.png', category: 'EU SANCTIONS · NAME MATCHING', lines: ['Names, aliases', '& match evidence'], detail: 'A public portfolio demo · Julio Caesar' },
  { file: 'sanctions-monitor-preview.png', category: 'EU SANCTIONS · PIPELINE STATUS', lines: ['Source, parsing', '& data quality'], detail: 'Saved pipeline results · Julio Caesar' },
];
for (const preview of previews) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#050505"/>
    <g font-family="Arial, sans-serif">
      <text x="92" y="110" fill="#f5f5f5" font-size="38">Julio Caesar</text>
      <text x="94" y="158" fill="#b5b5b5" font-size="20">${preview.category.replaceAll('&', '&amp;')}</text>
      ${preview.lines.map((line, index) => `<text x="92" y="${330 + index * 100}" fill="#f5f5f5" font-size="76">${line.replaceAll('&', '&amp;')}</text>`).join('')}
      <text x="96" y="545" fill="#b5b5b5" font-size="24">${preview.detail}</text>
    </g>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(new URL(`../public/${preview.file}`, import.meta.url)));
}
console.log('Prepared three PNG sharing previews.');
