import sharp from 'sharp';

async function makeCutoutFloodFill() {
  const cropped = await sharp('C:/Users/ruban/.gemini/antigravity-ide/brain/729770e8-d90a-43b9-a9e9-6c61974f8846/.user_uploaded/media_1792601335077.jpg')
    .extract({ left: 63, top: 14, width: 126, height: 168 })
    .toBuffer();

  const img = sharp(cropped);
  const { width, height } = await img.metadata();
  const raw = await img.ensureAlpha().raw().toBuffer();

  // Create 2D grid of whether pixel is background
  const isBg = new Uint8Array(width * height);
  const queue = [];

  // Seed boundary points
  for (let x = 0; x < width; x++) {
    queue.push(x, 0); // top row
  }
  for (let y = 0; y < height; y++) {
    queue.push(0, y); // left col
    queue.push(width - 1, y); // right col
  }

  const isLightOrBorder = (x, y) => {
    const idx = (y * width + x) * 4;
    const r = raw[idx];
    const g = raw[idx + 1];
    const b = raw[idx + 2];

    // Oval distance
    const cx = width / 2;
    const cy = height * 0.49;
    const rx = width * 0.49;
    const ry = height * 0.49;
    const normDist = ((x - cx) * (x - cx)) / (rx * rx) + ((y - cy) * (y - cy)) / (ry * ry);

    if (normDist > 1.02) return true; // outside border circle
    // White background
    if (r > 205 && g > 205 && b > 205 && Math.abs(r - g) < 25 && Math.abs(g - b) < 25) {
      return true;
    }
    return false;
  };

  let qHead = 0;
  while (qHead < queue.length) {
    const x = queue[qHead++];
    const y = queue[qHead++];
    const pos = y * width + x;

    if (isBg[pos]) continue;
    if (!isLightOrBorder(x, y)) continue;

    isBg[pos] = 1;

    // Neighbors (4-directional)
    if (x > 0 && !isBg[pos - 1]) queue.push(x - 1, y);
    if (x < width - 1 && !isBg[pos + 1]) queue.push(x + 1, y);
    if (y > 0 && !isBg[pos - width]) queue.push(x, y - 1);
    if (y < height - 1 && !isBg[pos + width]) queue.push(x, y + 1);
  }

  // Now create output buffer
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    out[idx] = raw[idx];
    out[idx + 1] = raw[idx + 1];
    out[idx + 2] = raw[idx + 2];
    out[idx + 3] = isBg[i] ? 0 : 255;
  }

  // Smooth mask edges slightly with sharp blur
  const mask = await sharp(out, { raw: { width, height, channels: 4 } })
    .extractChannel('alpha')
    .blur(0.6)
    .toBuffer();

  const finalRGBA = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    finalRGBA[idx] = raw[idx];
    finalRGBA[idx + 1] = raw[idx + 1];
    finalRGBA[idx + 2] = raw[idx + 2];
    finalRGBA[idx + 3] = mask[i];
  }

  // Now upscale nicely using sharp with lanczos to 1100, 720, 420 for responsive WebP
  const hiCutout = await sharp(finalRGBA, { raw: { width, height, channels: 4 } }).png().toBuffer();

  // Save responsive WebPs to public/assets
  for (const w of [1100, 720, 420]) {
    await sharp(hiCutout)
      .resize({ width: w, kernel: 'lanczos3' })
      .webp({ quality: 90, alphaQuality: 95 })
      .toFile(`public/assets/portrait-${w}.webp`);
  }

  // Also build social share image og-image.jpg
  const portraitForOg = await sharp(hiCutout)
    .resize({ height: 580, kernel: 'lanczos3' })
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
      { input: portraitForOg, gravity: 'southeast' },
      {
        input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
          <text x="72" y="290" font-family="Impact, 'Arial Narrow', sans-serif" font-size="110" fill="#f4f1ec" letter-spacing="4">SUBBULAKSHMI</text>
          <text x="78" y="345" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="24" fill="#ff3d5a" letter-spacing="14">THE SERIES</text>
          <text x="78" y="415" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="18" fill="#a7a6ad" letter-spacing="4">FULL STACK DEVELOPER • MCA • REACT &amp; PYTHON</text>
        </svg>`),
      },
    ])
    .jpeg({ quality: 88 })
    .toFile(`public/assets/og-image.jpg`);

  console.log('Flood fill cutout and responsive portraits generated successfully!');
}

makeCutoutFloodFill();
