import sharp from 'sharp';

async function checkBackground() {
  const { data, info } = await sharp('crop_test.jpeg').raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  let pureBlack = 0;
  let nearBlack = 0;
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];
    if (r === 0 && g === 0 && b === 0) pureBlack++;
    else if (r < 8 && g < 8 && b < 8) nearBlack++;
  }
  console.log(`Total pixels: ${width * height}, pure black: ${pureBlack} (${((pureBlack / (width * height)) * 100).toFixed(1)}%), near black: ${nearBlack}`);
}

checkBackground();
