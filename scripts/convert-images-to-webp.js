import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsDir = join(__dirname, '..', 'src', 'assets');

async function convertImagesToWebP() {
  try {
    const files = await readdir(assetsDir);
    const jpgFiles = files.filter(file => file.endsWith('.jpg'));

    console.log(`Found ${jpgFiles.length} JPG files to convert...`);

    for (const file of jpgFiles) {
      const inputPath = join(assetsDir, file);
      const outputPath = join(assetsDir, file.replace('.jpg', '.webp'));

      console.log(`Converting ${file}...`);

      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      const inputStats = await sharp(inputPath).metadata();
      const outputStats = await sharp(outputPath).metadata();

      console.log(`  ✓ ${file} → ${file.replace('.jpg', '.webp')}`);
      console.log(`    Size: ${Math.round(inputStats.size / 1024)}KB → ${Math.round(outputStats.size / 1024)}KB`);
    }

    console.log('\n✨ All images converted successfully!');
  } catch (error) {
    console.error('Error converting images:', error);
    process.exit(1);
  }
}

convertImagesToWebP();
