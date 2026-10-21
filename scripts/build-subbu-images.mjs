import sharp from 'sharp';
import fs from 'node:fs';

const OUT = 'public/assets';
fs.mkdirSync(OUT, { recursive: true });

// Copy source assets
fs.copyFileSync('clean_cutout_test.png', 'pic.png');
fs.copyFileSync('subbulakshmi_cutout.jpeg', 'pic1.jpeg');

async function buildAllPortraits() {
  const cutout = sharp('clean_cutout_test.png');

  // Build responsive WebPs for Hero, OpeningSequence, ProfileSelector, and About
  for (const w of [1100, 720, 420]) {
    await sharp('clean_cutout_test.png')
      .resize({ width: w })
      .webp({ quality: 92, alphaQuality: 95 })
      .toFile(`${OUT}/portrait-${w}.webp`);
    console.log(`Generated ${OUT}/portrait-${w}.webp`);
  }

  // Social share image (1200x630) on dark backdrop with red radial glow
  const portraitOg = await sharp('clean_cutout_test.png')
    .resize({ height: 580 })
    .png()
    .toBuffer();

  await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#07070a' } })
    .composite([
      {
        input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
          <defs><radialGradient id="g" cx="78%" cy="45%" r="45%"><stop offset="0" stop-color="#e5132b" stop-opacity="0.45"/><stop offset="1" stop-color="#e5132b" stop-opacity="0"/></radialGradient></defs>
          <rect width="1200" height="630" fill="url(#g)"/>
        </svg>`),
      },
      { input: portraitOg, gravity: 'southeast' },
      {
        input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
          <text x="72" y="290" font-family="Impact, 'Arial Narrow', sans-serif" font-size="105" fill="#f4f1ec" letter-spacing="4">SUBBULAKSHMI</text>
          <text x="78" y="345" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="24" fill="#ff3d5a" letter-spacing="14">THE SERIES</text>
          <text x="78" y="415" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="18" fill="#a7a6ad" letter-spacing="4">FULL STACK DEVELOPER • MCA • REACT &amp; PYTHON</text>
        </svg>`),
      },
    ])
    .jpeg({ quality: 88 })
    .toFile(`${OUT}/og-image.jpg`);

  console.log(`Generated ${OUT}/og-image.jpg`);
}

buildAllPortraits();
