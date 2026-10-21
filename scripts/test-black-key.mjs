import sharp from 'sharp';

async function testBlackKey() {
  const { data, info } = await sharp('crop_test.jpeg').raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Let's create an RGBA buffer where black background is transparent
  // We can use flood-fill from edges (or luminance-based alpha threshold for smooth edges)
  const isBg = new Uint8Array(width * height);
  const queue = [];

  // Seed boundary points
  for (let x = 0; x < width; x++) {
    queue.push(x, 0);
  }
  for (let y = 0; y < height; y++) {
    queue.push(0, y);
    queue.push(width - 1, y);
  }

  const isBlackEdge = (x, y) => {
    const idx = (y * width + x) * 3;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    return r < 12 && g < 12 && b < 12;
  };

  let qHead = 0;
  while (qHead < queue.length) {
    const x = queue[qHead++];
    const y = queue[qHead++];
    const pos = y * width + x;

    if (isBg[pos]) continue;
    if (!isBlackEdge(x, y)) continue;

    isBg[pos] = 1;

    if (x > 0 && !isBg[pos - 1]) queue.push(x - 1, y);
    if (x < width - 1 && !isBg[pos + 1]) queue.push(x + 1, y);
    if (y > 0 && !isBg[pos - width]) queue.push(x, y - 1);
    if (y < height - 1 && !isBg[pos + width]) queue.push(x, y + 1);
  }

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
      // Soft edge near background
      const maxC = Math.max(r, g, b);
      if (maxC < 30) {
        out[idx + 3] = Math.min(255, maxC * 8);
      } else {
        out[idx + 3] = 255;
      }
    }
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('crop_keyed.png');

  console.log('Keyed crop saved to crop_keyed.png');
}

testBlackKey();
