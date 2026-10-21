import sharp from 'sharp';

async function makeFlawlessCutout() {
  const { data, info } = await sharp('subbulakshmi_cutout.jpeg').raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  const isBg = new Uint8Array(width * height);
  const queue = [];

  // Seed ONLY top edge and top 70% of left/right edges
  // NEVER seed from bottom or bottom corners where her shirt touches
  for (let x = 0; x < width; x++) {
    queue.push(x, 0); // top row
  }
  for (let y = 0; y < Math.floor(height * 0.7); y++) {
    queue.push(0, y); // left side top portion
    queue.push(width - 1, y); // right side top portion
  }

  // A pixel is exterior white background if it's bright and neutral
  const isWhiteBg = (x, y) => {
    const idx = (y * width + x) * 3;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    
    // Background is white/light grey studio wall
    return r > 218 && g > 218 && b > 218 && Math.abs(r - g) < 18 && Math.abs(g - b) < 18;
  };

  let qHead = 0;
  while (qHead < queue.length) {
    const x = queue[qHead++];
    const y = queue[qHead++];
    const pos = y * width + x;

    if (isBg[pos]) continue;
    if (!isWhiteBg(x, y)) continue;

    isBg[pos] = 1;

    // 4-way flood fill
    if (x > 0 && !isBg[pos - 1]) queue.push(x - 1, y);
    if (x < width - 1 && !isBg[pos + 1]) queue.push(x + 1, y);
    if (y > 0 && !isBg[pos - width]) queue.push(x, y - 1);
    if (y < height - 1 && !isBg[pos + width]) queue.push(x, y + 1);
  }

  // Create alpha mask
  const alphaMask = Buffer.alloc(width * height);
  for (let i = 0; i < width * height; i++) {
    alphaMask[i] = isBg[i] ? 0 : 255;
  }

  // Soft anti-aliased edge
  const blurredAlpha = await sharp(alphaMask, { raw: { width, height, channels: 1 } })
    .blur(0.8)
    .toBuffer();

  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    const srcIdx = i * 3;
    out[idx] = data[srcIdx];
    out[idx + 1] = data[srcIdx + 1];
    out[idx + 2] = data[srcIdx + 2];
    out[idx + 3] = blurredAlpha[i];
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('flawless_cutout.png');

  console.log('Saved to flawless_cutout.png');
}

makeFlawlessCutout();
