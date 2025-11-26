import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const INPUT_DIR = 'public/images';
const OUTPUT_DIR = 'public/images/optimized';

// Responsive sizes to generate
const SIZES = [640, 750, 828, 1080, 1200, 1920];

// Maximum original size
const MAX_ORIGINAL_WIDTH = 1920;

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  try {
    // Create output directory
    if (!existsSync(OUTPUT_DIR)) {
      await mkdir(OUTPUT_DIR, { recursive: true });
      console.log(`📁 Created directory: ${OUTPUT_DIR}\n`);
    }

    // Get all images
    const files = await readdir(INPUT_DIR);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

    if (imageFiles.length === 0) {
      console.log('⚠️  No images found in public/images/');
      return;
    }

    console.log(`📷 Found ${imageFiles.length} images to optimize\n`);

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let processedCount = 0;

    for (const file of imageFiles) {
      const inputPath = join(INPUT_DIR, file);
      const name = basename(file, extname(file));
      const ext = extname(file).toLowerCase();

      console.log(`🔄 Processing: ${file}`);

      try {
        // Get original file size
        const { size: originalSize } = await sharp(inputPath).metadata();
        totalOriginalSize += originalSize;

        // Optimize and resize original
        const optimizedOriginal = await sharp(inputPath)
          .resize(MAX_ORIGINAL_WIDTH, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .toBuffer();

        // Generate WebP (best compression, wide support)
        const webpBuffer = await sharp(optimizedOriginal)
          .webp({ quality: 85, effort: 6 })
          .toFile(join(OUTPUT_DIR, `${name}.webp`));

        console.log(`  ✅ WebP: ${(webpBuffer.size / 1024).toFixed(1)} KB`);
        totalOptimizedSize += webpBuffer.size;

        // Generate AVIF (best compression, newer format)
        const avifBuffer = await sharp(optimizedOriginal)
          .avif({ quality: 80, effort: 6 })
          .toFile(join(OUTPUT_DIR, `${name}.avif`));

        console.log(`  ✅ AVIF: ${(avifBuffer.size / 1024).toFixed(1)} KB`);
        totalOptimizedSize += avifBuffer.size;

        // Generate responsive sizes (WebP only for responsive)
        for (const size of SIZES) {
          const responsiveBuffer = await sharp(optimizedOriginal)
            .resize(size, null, { withoutEnlargement: true })
            .webp({ quality: 85 })
            .toFile(join(OUTPUT_DIR, `${name}-${size}w.webp`));

          totalOptimizedSize += responsiveBuffer.size;
        }
        console.log(`  ✅ Generated ${SIZES.length} responsive sizes`);

        // Also save optimized original JPG
        if (ext === '.jpg' || ext === '.jpeg') {
          const optimizedJpg = await sharp(optimizedOriginal)
            .jpeg({ quality: 85, progressive: true })
            .toFile(join(OUTPUT_DIR, `${name}${ext}`));

          console.log(`  ✅ Optimized JPG: ${(optimizedJpg.size / 1024).toFixed(1)} KB`);
          totalOptimizedSize += optimizedJpg.size;
        } else if (ext === '.png') {
          const optimizedPng = await sharp(optimizedOriginal)
            .png({ quality: 85, compressionLevel: 9 })
            .toFile(join(OUTPUT_DIR, `${name}.png`));

          console.log(`  ✅ Optimized PNG: ${(optimizedPng.size / 1024).toFixed(1)} KB`);
          totalOptimizedSize += optimizedPng.size;
        }

        console.log(`  💾 Original: ${(originalSize / 1024).toFixed(1)} KB → Saved: ${((originalSize - webpBuffer.size) / originalSize * 100).toFixed(1)}%\n`);

        processedCount++;

      } catch (error) {
        console.error(`  ❌ Error processing ${file}:`, error.message);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 OPTIMIZATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successfully processed: ${processedCount}/${imageFiles.length} images`);
    console.log(`📦 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📦 Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`💾 Total saved: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)} MB (${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}%)`);
    console.log(`\n📁 Output directory: ${OUTPUT_DIR}`);
    console.log('\n✨ Next steps:');
    console.log('   1. Review optimized images in public/images/optimized/');
    console.log('   2. Replace original images if satisfied with quality');
    console.log('   3. Update image paths in your code to use optimized versions');
    console.log('   4. Consider using <picture> tag for WebP/AVIF with JPG fallback\n');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run optimization
optimizeImages();
