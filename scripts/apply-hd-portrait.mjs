import sharp from 'sharp';
import fs from 'node:fs';

const SOURCE = 'public/assets/portrait-1100.webp.png';
const OUT = 'public/assets';

async function updateAllPortraits() {
  console.log('Generating ultra-high quality portraits from:', SOURCE);

  // Copy to root as master pic.png
  fs.copyFileSync(SOURCE, 'pic.png');

  // 1. Build responsive WebPs with maximum visual fidelity (quality: 95, effort: 6)
  for (const w of [1100, 720, 420]) {
    await sharp(SOURCE)
      .resize({ width: w, kernel: 'lanczos3' })
      .webp({ quality: 95, alphaQuality: 100, effort: 6 })
      .toFile(`${OUT}/portrait-${w}.webp`);
    console.log(`Generated: ${OUT}/portrait-${w}.webp`);
  }

  // 2. Build social share image (1200x630) on cyberpunk dark theme backdrop
  const portraitOg = await sharp(SOURCE)
    .resize({ height: 590, kernel: 'lanczos3' })
    .png()
    .toBuffer();

  await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#050814' } })
    .composite([
      {
        input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="cyanGlow" cx="75%" cy="45%" r="48%">
              <stop offset="0%" stop-color="#00f2fe" stop-opacity="0.38"/>
              <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.12"/>
              <stop offset="100%" stop-color="#050814" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="purpleGlow" cx="30%" cy="80%" r="40%">
              <stop offset="0%" stop-color="#a855f7" stop-opacity="0.22"/>
              <stop offset="100%" stop-color="#050814" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1200" height="630" fill="#050814"/>
          <rect width="1200" height="630" fill="url(#cyanGlow)"/>
          <rect width="1200" height="630" fill="url(#purpleGlow)"/>
        </svg>`),
      },
      { input: portraitOg, gravity: 'southeast' },
      {
        input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
          <text x="72" y="280" font-family="Impact, 'Arial Narrow', sans-serif" font-size="105" fill="#f8fafc" letter-spacing="4">SUBBULAKSHMI</text>
          <text x="78" y="335" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="24" fill="#00f2fe" letter-spacing="14">THE SERIES</text>
          <text x="78" y="405" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="17" fill="#94a3b8" letter-spacing="4">FULL STACK DEVELOPER • MCA • REACT &amp; PYTHON</text>
        </svg>`),
      },
    ])
    .jpeg({ quality: 92 })
    .toFile(`${OUT}/og-image.jpg`);

  console.log(`Generated: ${OUT}/og-image.jpg`);
  console.log('All portraits replaced with ultra-high quality version successfully!');
}

updateAllPortraits();
