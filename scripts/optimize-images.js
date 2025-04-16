/**
 * Image Optimization Script
 * 
 * This script optimizes all images in the src/assets directory,
 * reducing their file size while maintaining quality.
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

// Configuration
const config = {
  inputDir: path.join(__dirname, '../src/assets'),
  outputDir: path.join(__dirname, '../src/assets/optimized'),
  jpegOptions: { quality: 80 },
  pngOptions: { quality: 80 },
  webpOptions: { quality: 75 },
  avifOptions: { quality: 65 },
  resizeThreshold: 1920, // Max width or height in pixels
};

// Create output directory if it doesn't exist
async function ensureOutputDir() {
  try {
    await fs.mkdir(config.outputDir, { recursive: true });
    console.log(`Created output directory: ${config.outputDir}`);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(`Error creating output directory: ${err.message}`);
      process.exit(1);
    }
  }
}

// Get all images recursively from input directory
function getImages() {
  return new Promise((resolve, reject) => {
    glob('**/*.{jpg,jpeg,png,gif}', { cwd: config.inputDir }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

// Optimize a single image
async function optimizeImage(file) {
  const inputPath = path.join(config.inputDir, file);
  const outputPath = path.join(config.outputDir, file);
  const outputDir = path.dirname(outputPath);
  
  // Create output subdirectory if it doesn't exist
  await fs.mkdir(outputDir, { recursive: true });
  
  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Create sharp instance
    let sharpInstance = sharp(inputPath);
    
    // Resize if image is larger than threshold
    if (metadata.width > config.resizeThreshold || metadata.height > config.resizeThreshold) {
      sharpInstance = sharpInstance.resize({
        width: Math.min(metadata.width, config.resizeThreshold),
        height: Math.min(metadata.height, config.resizeThreshold),
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    
    // Process based on format
    const ext = path.extname(file).toLowerCase();
    
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharpInstance.jpeg(config.jpegOptions).toFile(outputPath);
      // Also create WebP and AVIF versions
      await sharpInstance.webp(config.webpOptions).toFile(outputPath.replace(ext, '.webp'));
      await sharpInstance.avif(config.avifOptions).toFile(outputPath.replace(ext, '.avif'));
    } else if (ext === '.png') {
      await sharpInstance.png(config.pngOptions).toFile(outputPath);
      // Also create WebP and AVIF versions
      await sharpInstance.webp(config.webpOptions).toFile(outputPath.replace(ext, '.webp'));
      await sharpInstance.avif(config.avifOptions).toFile(outputPath.replace(ext, '.avif'));
    } else if (ext === '.gif') {
      // GIFs are copied as-is since sharp doesn't process animated GIFs well
      await fs.copyFile(inputPath, outputPath);
    }
    
    // Get file sizes for comparison
    const inputStats = await fs.stat(inputPath);
    const outputStats = await fs.stat(outputPath);
    const savingsPercent = ((1 - outputStats.size / inputStats.size) * 100).toFixed(2);
    
    console.log(`Optimized ${file} - Saved ${savingsPercent}% (${(inputStats.size - outputStats.size) / 1024} KB)`);
  } catch (err) {
    console.error(`Error optimizing ${file}: ${err.message}`);
  }
}

// Main function
async function main() {
  console.log('Starting image optimization...');
  
  try {
    await ensureOutputDir();
    const images = await getImages();
    
    console.log(`Found ${images.length} images to optimize...`);
    
    for (const image of images) {
      await optimizeImage(image);
    }
    
    console.log('Image optimization complete!');
  } catch (err) {
    console.error(`Error during optimization: ${err.message}`);
    process.exit(1);
  }
}

// Run the script
main(); 