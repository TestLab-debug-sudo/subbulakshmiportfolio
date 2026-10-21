import sharp from 'sharp';

async function compare() {
  const meta1 = await sharp('subbulakshmi_cutout.jpeg').metadata();
  const meta2 = await sharp('crop_test.jpeg').metadata();
  console.log('subbulakshmi_cutout:', meta1.width, meta1.height);
  console.log('crop_test:', meta2.width, meta2.height);
}
compare();
