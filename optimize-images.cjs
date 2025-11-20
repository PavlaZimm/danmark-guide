const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = './public/images';
const imagesToOptimize = [
  '20240811_160639.jpg',
  'IMG_20230711_114209.jpg',
  '20240813_130726.jpg',
  'IMG_20230712_091836.jpg',
  'IMG_20230712_161624.jpg',
  'IMG_20230711_085341.jpg',
  'atterseebook.jpg'
];

async function optimizeImages() {
  console.log('Starting image optimization...\n');

  for (const imageName of imagesToOptimize) {
    const inputPath = path.join(imagesDir, imageName);
    const outputPath = path.join(imagesDir, imageName);

    try {
      const stats = fs.statSync(inputPath);
      const sizeBefore = (stats.size / 1024 / 1024).toFixed(2);

      await sharp(inputPath)
        .resize(1600, 1600, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({
          quality: 82,
          mozjpeg: true
        })
        .toFile(outputPath + '.tmp');

      fs.renameSync(outputPath + '.tmp', outputPath);

      const newStats = fs.statSync(outputPath);
      const sizeAfter = (newStats.size / 1024 / 1024).toFixed(2);
      const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);

      console.log(`✓ ${imageName}`);
      console.log(`  ${sizeBefore} MB → ${sizeAfter} MB (${reduction}% reduction)\n`);

    } catch (error) {
      console.error(`✗ Error optimizing ${imageName}:`, error.message);
    }
  }

  console.log('Optimization complete!');
}

optimizeImages();
