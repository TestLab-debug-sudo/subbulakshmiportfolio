import sharp from 'sharp';

async function testWhiteKey() {
  const { data, info } = await sharp('subbulakshmi_cutout.jpeg').raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Let's create an RGBA buffer where white background is transparent
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

  // White threshold: pixels connected to the edge that are near white/light grey
  const isWhiteEdge = (x, y) => {
    const idx = (y * width + x) * 3;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    
    // Background is bright/white
    return r > 215 && g > 215 && b > 215 && Math.abs(r - g) < 20 && Math.abs(g - b) < 20;
  };

  let qHead = 0;
  while (qHead < queue.length) {
    const x = queue[qHead++];
    const y = queue[qHead++];
    const pos = y * width + x;

    if (isBg[pos]) continue;
    if (!isWhiteEdge(x, y)) continue;

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
      out[idx + 3] = 255;
    }
  }

  // Smooth edges slightly with alpha blur
  const alphaChannel = await sharp(out, { raw: { width, height, channels: 4 } })
    .extractChannel('alpha')
    .blur(0.8)
    .toBuffer();

  const finalRGBA = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    finalRGBA[idx] = out[idx];
    finalRGBA[idx + 1] = out[idx + 1];
    finalRGBA[idx + 2] = out[idx + 2];
    finalRGBA[idx + 3] = alphaChannel[i];
  }

  await sharp(finalRGBA, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('white_keyed.png');

  console.log('Saved to white_keyed.png');
}

testWhiteKey();
