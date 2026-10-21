import sharp from 'sharp';

async function makePerfectCutout() {
  const { data, info } = await sharp('crop_test.jpeg').raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Step 1: Identify background pixels using flood fill strictly on pure black (r+g+b <= 3)
  const isBg = new Uint8Array(width * height);
  const queue = [];

  // Seed boundary points
  for (let x = 0; x < width; x++) {
    queue.push(x, 0); // top
  }
  for (let y = 0; y < height; y++) {
    queue.push(0, y); // left
    queue.push(width - 1, y); // right
  }

  const isPureBlack = (x, y) => {
    const idx = (y * width + x) * 3;
    return data[idx] <= 3 && data[idx + 1] <= 3 && data[idx + 2] <= 3;
  };

  let qHead = 0;
  while (qHead < queue.length) {
    const x = queue[qHead++];
    const y = queue[qHead++];
    const pos = y * width + x;

    if (isBg[pos]) continue;
    if (!isPureBlack(x, y)) continue;

    isBg[pos] = 1;

    if (x > 0 && !isBg[pos - 1]) queue.push(x - 1, y);
    if (x < width - 1 && !isBg[pos + 1]) queue.push(x + 1, y);
    if (y > 0 && !isBg[pos - width]) queue.push(x, y - 1);
    if (y < height - 1 && !isBg[pos + width]) queue.push(x, y + 1);
  }

  // Any pixel that is NOT connected to the exterior pure-black boundary is FOREGROUND!
  // This completely eliminates any holes inside her hair or clothes!
  // To soften the border smoothly, we can calculate distance/blur on the alpha mask.
  const alphaMask = Buffer.alloc(width * height);
  for (let i = 0; i < width * height; i++) {
    alphaMask[i] = isBg[i] ? 0 : 255;
  }

  // Smooth mask edge by 1px blur
  const blurredAlpha = await sharp(alphaMask, { raw: { width, height, channels: 1 } })
    .blur(1.0)
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
    .toFile('perfect_cutout.png');

  console.log('perfect_cutout.png saved');
}

makePerfectCutout();
