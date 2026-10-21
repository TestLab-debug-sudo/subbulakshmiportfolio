import sharp from 'sharp';

async function processCropTest() {
  const img = sharp('crop_test.jpeg');
  const { width, height } = await img.metadata();
  const raw = await img.raw().toBuffer();

  // Create an alpha mask
  // In crop_test.jpeg, the user set the background to solid black (0, 0, 0).
  // Let's find all pixels connected to the corners that are black.
  const alpha = Buffer.alloc(width * height);
  alpha.fill(255); // default foreground

  const isBg = new Uint8Array(width * height);
  const queue = [];

  // Seed outer corners and edges
  for (let x = 0; x < width; x++) {
    queue.push(x, 0); // top row
    if (x < 100 || x > width - 100) {
      queue.push(x, height - 1); // bottom corners
    }
  }
  for (let y = 0; y < height; y++) {
    queue.push(0, y); // left col
    queue.push(width - 1, y); // right col
  }

  // Threshold: The black background is mostly [0,0,0], but compression gives up to ~8
  const isDarkBg = (x, y) => {
    const idx = (y * width + x) * 3;
    const r = raw[idx];
    const g = raw[idx + 1];
    const b = raw[idx + 2];
    return r < 10 && g < 10 && b < 10;
  };

  let qHead = 0;
  while (qHead < queue.length) {
    const x = queue[qHead++];
    const y = queue[qHead++];
    const pos = y * width + x;

    if (isBg[pos]) continue;
    if (!isDarkBg(x, y)) continue;

    isBg[pos] = 1;
    alpha[pos] = 0;

    if (x > 0 && !isBg[pos - 1]) queue.push(x - 1, y);
    if (x < width - 1 && !isBg[pos + 1]) queue.push(x + 1, y);
    if (y > 0 && !isBg[pos - width]) queue.push(x, y - 1);
    if (y < height - 1 && !isBg[pos + width]) queue.push(x, y + 1);
  }

  // Feather the alpha mask for smooth edge
  const feathered = await sharp(alpha, { raw: { width, height, channels: 1 } })
    .blur(0.8)
    .toBuffer();

  // Combine RGB from crop_test.jpeg with the feathered alpha
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4] = raw[i * 3];
    rgba[i * 4 + 1] = raw[i * 3 + 1];
    rgba[i * 4 + 2] = raw[i * 3 + 2];
    rgba[i * 4 + 3] = feathered[i];
  }

  const cutout = await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();

  // Generate responsive WebPs in public/assets
  for (const w of [1100, 720, 420]) {
    await sharp(cutout)
      .resize({ width: w })
      .webp({ quality: 92, alphaQuality: 95 })
      .toFile(`public/assets/portrait-${w}.webp`);
  }

  // Social share image (1200x630)
  const portraitOg = await sharp(cutout)
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
          <text x="72" y="290" font-family="Impact, 'Arial Narrow', sans-serif" font-size="110" fill="#f4f1ec" letter-spacing="4">SUBBULAKSHMI</text>
          <text x="78" y="345" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="24" fill="#ff3d5a" letter-spacing="14">THE SERIES</text>
          <text x="78" y="415" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="18" fill="#a7a6ad" letter-spacing="4">FULL STACK DEVELOPER • MCA • REACT &amp; PYTHON</text>
        </svg>`),
      },
    ])
    .jpeg({ quality: 88 })
    .toFile(`public/assets/og-image.jpg`);

  console.log('Successfully generated responsive WebPs and og-image from crop_test.jpeg');
}

processCropTest();
