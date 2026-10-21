import path from 'node:path';
import sharp from 'sharp';

const sourceLogo = 'public/assets/Elegant S&K Crown Monogram Logo.png';
const publicDir = path.resolve('public');
const assetsDir = path.resolve('public/assets');

// 1. Trim transparent padding from the logo
const trimmedBuffer = await sharp(sourceLogo)
  .trim()
  .toBuffer();

// Save trimmed high-res logo
await sharp(trimmedBuffer)
  .png({ quality: 100 })
  .toFile(path.join(assetsDir, 'sk-monogram.png'));

// 2. Create square icon for favicon / app icon (with dark rounded squircle background)
// 192x192 square icon
const iconLogo = await sharp(trimmedBuffer)
  .resize(136, 136, { fit: 'contain' })
  .toBuffer();

const iconBase64 = `data:image/png;base64,${iconLogo.toString('base64')}`;

const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
  <rect width="192" height="192" rx="42" fill="#070a14" />
  <rect width="188" height="188" x="2" y="2" rx="40" fill="none" stroke="rgba(0,242,254,0.35)" stroke-width="2" />
  <image href="${iconBase64}" x="28" y="28" width="136" height="136" />
</svg>
`;

await sharp(Buffer.from(faviconSvg))
  .png()
  .toFile(path.join(publicDir, 'favicon.png'));

await sharp(Buffer.from(faviconSvg))
  .png()
  .toFile(path.join(assetsDir, 'sk-monogram-icon.png'));

// Also write SVG favicon directly
import fs from 'node:fs';
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg.trim());

console.log('Logo and Favicon assets successfully processed!');
