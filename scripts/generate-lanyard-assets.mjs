import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const sourcePhoto = 'C:/Users/ruban/.gemini/antigravity-ide/brain/729770e8-d90a-43b9-a9e9-6c61974f8846/.user_uploaded/media_1792610829147.jpg';
const publicDir = path.resolve('public/assets');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1024 x 1440 full-bleed cover with position: top
// This guarantees the photo goes from y=0 all the way down with NO top borders, NO seams, NO horizontal lines!
const fullCoverPhoto = await sharp(sourcePhoto)
  .resize(1024, 1440, { fit: 'cover', position: 'top' })
  .png({ quality: 100 })
  .toBuffer();

const photoBase64 = `data:image/png;base64,${fullCoverPhoto.toString('base64')}`;

const frontSvg = `
<svg width="1024" height="1440" viewBox="0 0 1024 1440" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Smooth gradient fade only at the bottom for clean text legibility -->
    <linearGradient id="bottomFade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#02040a" stop-opacity="0" />
      <stop offset="35%" stop-color="#02040a" stop-opacity="0.6" />
      <stop offset="70%" stop-color="#02040a" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#02040a" stop-opacity="1" />
    </linearGradient>
  </defs>

  <!-- Complete photo - FULL 100% BLEED, FROM y=0 TO 1440. NO TOP LINE, NO BORDER! -->
  <image href="${photoBase64}" x="0" y="0" width="1024" height="1440" />

  <!-- Bottom dark gradient fade for typography -->
  <rect x="0" y="1020" width="1024" height="420" fill="url(#bottomFade)" />

  <!-- Crisp, clean name & role at the bottom (NO BORDERS, NO BOXES) -->
  <g transform="translate(512, 1260)">
    <text x="0" y="0" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="56" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="4">SUBBULAKSHMI K</text>
    
    <text x="0" y="52" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="700" fill="#00f2fe" text-anchor="middle" letter-spacing="6">FULL STACK DEVELOPER</text>
  </g>
</svg>
`;

await sharp(Buffer.from(frontSvg)).png({ quality: 100 }).toFile(path.join(publicDir, 'lanyard-front.png'));
console.log('Successfully generated full-bleed, seamless front badge with NO top lines or borders!');
