import sharp from 'sharp';

// The resume is 724x1024.
// The circular portrait of Subbulakshmi is in the top-left area.
// Let's extract around x: 60, y: 15, width: 130, height: 165
async function run() {
  const meta = await sharp('C:/Users/ruban/.gemini/antigravity-ide/brain/729770e8-d90a-43b9-a9e9-6c61974f8846/.user_uploaded/media_1792601335077.jpg').metadata();
  console.log('Resume size:', meta.width, meta.height);
  
  // Let's crop a generous box around the avatar first to check
  // Ratio: top-left header
  // left roughly 55-70, top roughly 15-20, width ~125, height ~160
  await sharp('C:/Users/ruban/.gemini/antigravity-ide/brain/729770e8-d90a-43b9-a9e9-6c61974f8846/.user_uploaded/media_1792601335077.jpg')
    .extract({ left: 60, top: 12, width: 135, height: 170 })
    .toFile('crop_test.png');

  console.log('Cropped test saved');
}
run();
