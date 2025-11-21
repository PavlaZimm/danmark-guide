#!/usr/bin/env node

/**
 * Optimize images in public/images/
 * Resizes and compresses images to max 200KB
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is installed
let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.error('❌ Sharp is not installed. Installing now...');
  require('child_process').execSync('npm install sharp', { stdio: 'inherit' });
  sharp = require('sharp');
}

const IMAGES_DIR = path.join(__dirname, '../public/images');
const MAX_WIDTH = 1920;
const QUALITY = {
  jpeg: 82,
  webp: 80,
  png: 90
};

async function optimizeImage(filePath) {
  const filename = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();

  // Skip if not an image
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return;
  }

  try {
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;
    const originalSizeKB = Math.round(originalSize / 1024);

    // Skip if already small enough
    if (originalSize < 200 * 1024) {
      console.log(`✅ ${filename} - Already optimized (${originalSizeKB} KB)`);
      return;
    }

    console.log(`🔄 Processing ${filename} (${originalSizeKB} KB)...`);

    // Create backup
    const backupPath = filePath + '.backup';
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
    }

    // Optimize image
    const image = sharp(filePath);
    const metadata = await image.metadata();

    let pipeline = image;

    // Resize if too large
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // Apply compression based on format
    if (['.jpg', '.jpeg'].includes(ext)) {
      pipeline = pipeline.jpeg({ quality: QUALITY.jpeg, progressive: true });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: QUALITY.webp });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ quality: QUALITY.png, compressionLevel: 9 });
    }

    // Save optimized image
    await pipeline.toFile(filePath + '.tmp');

    // Check if optimization was successful
    const newStats = fs.statSync(filePath + '.tmp');
    const newSize = newStats.size;
    const newSizeKB = Math.round(newSize / 1024);
    const savedPercent = Math.round(((originalSize - newSize) / originalSize) * 100);

    // Only replace if smaller
    if (newSize < originalSize) {
      fs.renameSync(filePath + '.tmp', filePath);
      console.log(`✅ ${filename} - Optimized: ${originalSizeKB} KB → ${newSizeKB} KB (-${savedPercent}%)`);
    } else {
      fs.unlinkSync(filePath + '.tmp');
      console.log(`⚠️  ${filename} - Already optimal (${originalSizeKB} KB)`);
    }

  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);
  }
}

async function optimizeAllImages() {
  console.log('🖼️  Starting image optimization...\n');

  const files = fs.readdirSync(IMAGES_DIR);

  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);

    if (fs.statSync(filePath).isFile()) {
      await optimizeImage(filePath);
    }
  }

  console.log('\n✅ Image optimization complete!');
  console.log('\n💡 Tip: Backup files (.backup) were created. You can delete them if you\'re happy with the results.');
}

// Run
optimizeAllImages().catch(console.error);
