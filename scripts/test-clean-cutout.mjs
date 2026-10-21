import sharp from 'sharp';

async function testCleanCutout() {
  const { data, info } = await sharp('crop_test.jpeg').raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // 1. Flood fill from corners for background
  const isBg = new Uint8Array(width * height);
  const queue = [];

  // Seed boundary points
  for (let x = 0; x < width; x++) {
    queue.push(x, 0); // top row
    queue.push(x, height - 1); // bottom row
  }
  for (let y = 0; y < height; y++) {
    queue.push(0, y);
    queue.push(width - 1, y);
  }

  const isDark = (x, y) => {
    const idx = (y * width + x) * 3;
    return Math.max(data[idx], data[idx + 1], data[idx + 2]) <= 12;
  };

  let qHead = 0;
  while (qHead < queue.length) {
    const x = queue[qHead++];
    const y = queue[qHead++];
    const pos = y * width + x;

    if (isBg[pos]) continue;
    if (!isDark(x, y)) continue;

    isBg[pos] = 1;

    if (x > 0 && !isBg[pos - 1]) queue.push(x - 1, y);
    if (x < width - 1 && !isBg[pos + 1]) queue.push(x + 1, y);
    if (y > 0 && !isBg[pos - width]) queue.push(x, y - 1);
    if (y < height - 1 && !isBg[pos + width]) queue.push(x, y + 1);
  }

  // 2. Build alpha channel
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    const srcIdx = i * 3;
    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];

    out[idx] = r;
    out[idx + 1] = g;
    out[idx + 2] = b;

    if (isBg[i]) {
      out[idx + 3] = 0;
    } else {
      out[idx + 3] = 255;
    }
  }

  // Feather alpha channel slightly for anti-aliasing (0.6px)
  const alpha = await sharp(out, { raw: { width, height, channels: 4 } })
    .extractChannel('alpha')
    .blur(0.6)
    .toBuffer();

  const finalRGBA = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    finalRGBA[idx] = out[idx];
    finalRGBA[idx + 1] = out[idx + 1];
    finalRGBA[idx + 2] = out[idx + 2];
    finalRGBA[idx + 3] = alpha[i];
  }

  await sharp(finalRGBA, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('clean_cutout_test.png');

  console.log('clean_cutout_test.png saved!');
}

testCleanCutout();
