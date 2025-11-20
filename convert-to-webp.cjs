const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = './public/images';
const imagesToConvert = [
  'pavla-author.jpg',
  '20240811_160639.jpg',
  '20240813_130726.jpg',
  'IMG_20230711_085341.jpg',
  'IMG_20230711_114209.jpg',
  'IMG_20230712_091836.jpg',
  'IMG_20230712_161624.jpg',
  'atterseebook.jpg'
];

async function convertToWebP() {
  console.log('Converting images to WebP format...\n');

  for (const imageName of imagesToConvert) {
    const inputPath = path.join(imagesDir, imageName);
    const outputName = imageName.replace('.jpg', '.webp');
    const outputPath = path.join(imagesDir, outputName);

    try {
      const jpgStats = fs.statSync(inputPath);
      const jpgSize = (jpgStats.size / 1024).toFixed(0);

      // Convert to WebP
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

  console.log('✅ WebP conversion complete!');
}

convertToWebP();
