/**
 * Image Optimization Script
 * 
 * Converts PNG images to WebP format for better performance.
 * Run: node scripts/optimize-images.js
 * 
 * Requirements: npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Images to optimize (currently 443KB each)
const imagesToOptimize = [
    'apple-touch-icon.png',
    'icon-192.png',
    'icon-512.png',
    'og-image.png',
];

async function optimizeImage(filename) {
    const inputPath = path.join(PUBLIC_DIR, filename);
    const outputPath = path.join(PUBLIC_DIR, filename.replace('.png', '.webp'));

    if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  Skipping ${filename} - file not found`);
        return;
    }

    try {
        const inputStats = fs.statSync(inputPath);
        const inputSizeKB = (inputStats.size / 1024).toFixed(2);

        await sharp(inputPath)
            .webp({ quality: 85 })
            .toFile(outputPath);

        const outputStats = fs.statSync(outputPath);
        const outputSizeKB = (outputStats.size / 1024).toFixed(2);
        const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

        console.log(`✅ ${filename}`);
        console.log(`   ${inputSizeKB}KB → ${outputSizeKB}KB (${savings}% smaller)`);
    } catch (error) {
        console.error(`❌ Error optimizing ${filename}:`, error.message);
    }
}

async function optimizePNG(filename) {
    const inputPath = path.join(PUBLIC_DIR, filename);

    if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  Skipping ${filename} - file not found`);
        return;
    }

    try {
        const inputStats = fs.statSync(inputPath);
        const inputSizeKB = (inputStats.size / 1024).toFixed(2);

        // Optimize in place
        const buffer = await sharp(inputPath)
            .png({
                quality: 85,
                compressionLevel: 9,
                palette: true
            })
            .toBuffer();

        fs.writeFileSync(inputPath, buffer);

        const outputStats = fs.statSync(inputPath);
        const outputSizeKB = (outputStats.size / 1024).toFixed(2);
        const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

        console.log(`✅ ${filename} (PNG optimized)`);
        console.log(`   ${inputSizeKB}KB → ${outputSizeKB}KB (${savings}% smaller)`);
    } catch (error) {
        console.error(`❌ Error optimizing ${filename}:`, error.message);
    }
}

async function main() {
    console.log('🖼️  Image Optimization Script\n');
    console.log('Creating WebP versions...\n');

    for (const image of imagesToOptimize) {
        await optimizeImage(image);
    }

    console.log('\n✨ Optimization complete!');
    console.log('\nNote: Keep both PNG and WebP files.');
    console.log('Next.js will automatically serve WebP to supported browsers.');
}

main().catch(console.error);
