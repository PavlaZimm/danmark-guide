const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = './src/assets';
const imagesToConvert = [
  'hero-denmark.jpg',
  'countryside.jpg',
  'hygge.jpg',
  'design.jpg'
];

async function convertHomepageImages() {
  console.log('Converting homepage images to WebP...\n');

  for (const imageName of imagesToConvert) {
    const inputPath = path.join(assetsDir, imageName);
    const outputName = imageName.replace('.jpg', '.webp');
    const outputPath = path.join(assetsDir, outputName);

    try {
      const jpgStats = fs.statSync(inputPath);
      const jpgSize = (jpgStats.size / 1024).toFixed(0);

      await sharp(inputPath)
        .webp({
          quality: 85,
          effort: 6
        })
        .toFile(outputPath);

      const webpStats = fs.statSync(outputPath);
      const webpSize = (webpStats.size / 1024).toFixed(0);
      const reduction = ((1 - webpStats.size / jpgStats.size) * 100).toFixed(1);

      console.log(`✓ ${imageName} → ${outputName}`);
      console.log(`  ${jpgSize} KB → ${webpSize} KB (${reduction}% smaller)\n`);

    } catch (error) {
      console.error(`✗ Error converting ${imageName}:`, error.message);
    }
  }

  console.log('✅ Homepage images converted!');
}

convertHomepageImages();
