import fs from 'node:fs';

// Embed JPEG into standard PDF 1.4 format
function createPdfFromJpeg(jpegPath, pdfPath) {
  const jpegData = fs.readFileSync(jpegPath);
  
  // Read JPEG width and height
  let offset = 0;
  let width = 724;
  let height = 1024;
  while (offset < jpegData.length) {
    if (jpegData[offset] === 0xff && (jpegData[offset + 1] === 0xc0 || jpegData[offset + 1] === 0xc2)) {
      height = jpegData.readUInt16BE(offset + 5);
      width = jpegData.readUInt16BE(offset + 7);
      break;
    }
    offset++;
  }

  const pdfWidth = 595.28; // A4 width pt
  const pdfHeight = (height / width) * pdfWidth;

  const header = `%PDF-1.4\n`;
  const obj1 = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
  const obj2 = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;
  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pdfWidth} ${pdfHeight}] /Contents 4 0 R /Resources << /XObject << /Img 5 0 R >> >> >>\nendobj\n`;
  const streamContent = `q\n${pdfWidth} 0 0 ${pdfHeight} 0 0 cm\n/Img Do\nQ\n`;
  const obj4 = `4 0 obj\n<< /Length ${Buffer.byteLength(streamContent)} >>\nstream\n${streamContent}endstream\nendobj\n`;
  const obj5Header = `5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegData.length} >>\nstream\n`;
  const obj5Footer = `\nendstream\nendobj\n`;

  const parts = [
    Buffer.from(header),
    Buffer.from(obj1),
    Buffer.from(obj2),
    Buffer.from(obj3),
    Buffer.from(obj4),
    Buffer.from(obj5Header),
    jpegData,
    Buffer.from(obj5Footer),
  ];

  let currentPos = 0;
  const offsets = [];
  offsets.push(0); // 0th object
  currentPos += Buffer.byteLength(header);

  offsets.push(currentPos);
  currentPos += Buffer.byteLength(obj1);

  offsets.push(currentPos);
  currentPos += Buffer.byteLength(obj2);

  offsets.push(currentPos);
  currentPos += Buffer.byteLength(obj3);

  offsets.push(currentPos);
  currentPos += Buffer.byteLength(obj4);

  offsets.push(currentPos);
  currentPos += Buffer.byteLength(obj5Header) + jpegData.length + Buffer.byteLength(obj5Footer);

  const startxref = currentPos;
  let xref = `xref\n0 6\n0000000000 65535 f \n`;
  for (let i = 1; i <= 5; i++) {
    xref += String(offsets[i]).padStart(10, '0') + ` 00000 n \n`;
  }
  const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  parts.push(Buffer.from(xref));
  parts.push(Buffer.from(trailer));

  fs.writeFileSync(pdfPath, Buffer.concat(parts));
  console.log('PDF created successfully at', pdfPath);
}

createPdfFromJpeg(
  'C:/Users/ruban/.gemini/antigravity-ide/brain/729770e8-d90a-43b9-a9e9-6c61974f8846/.user_uploaded/media_1792601335077.jpg',
  'public/assets/Subbulakshmi_K_Resume.pdf'
);
