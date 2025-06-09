const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
  'og-image.jpg': 1200
};

// Create a simple gradient background
async function createFavicon(size) {
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f472b6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" fill="url(#grad)" />
      <text x="50%" y="50%" font-family="Arial" font-size="${size/2}px" fill="white" text-anchor="middle" dominant-baseline="middle">e</text>
    </svg>
  `;

  return sharp(Buffer.from(svg))
    .resize(size, size)
    .toBuffer();
}

// Create OG image
async function createOGImage() {
  const width = 1200;
  const height = 630;
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f472b6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)" />
      <text x="50%" y="40%" font-family="Arial" font-size="72px" fill="white" text-anchor="middle">eSignTap</text>
      <text x="50%" y="55%" font-family="Arial" font-size="36px" fill="white" text-anchor="middle">The Most Affordable DocuSign Alternative</text>
    </svg>
  `;

  return sharp(Buffer.from(svg))
    .resize(width, height)
    .jpeg({ quality: 90 })
    .toBuffer();
}

async function generateFavicons() {
  const publicDir = path.join(__dirname, '../public');

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Generate favicons
  for (const [filename, size] of Object.entries(sizes)) {
    const outputPath = path.join(publicDir, filename);
    let buffer;

    if (filename === 'og-image.jpg') {
      buffer = await createOGImage();
    } else {
      buffer = await createFavicon(size);
    }

    await sharp(buffer).toFile(outputPath);
    console.log(`Generated ${filename}`);
  }
}

generateFavicons().catch(console.error); 