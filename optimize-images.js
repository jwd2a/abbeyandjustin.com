const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// Images that need optimization (over 1MB)
const imagesToOptimize = [
  { name: 'rincon-puerto-rico.jpg', maxWidth: 2400 },
  { name: 'south_malecon_guanica.jpg', maxWidth: 2400 },
  { name: 'rincon_dome_beach.jpg', maxWidth: 2400 },
  { name: 'rincon_rainbow.jpg', maxWidth: 2400 },
  { name: 'ponce_parque_ecologico.jpg', maxWidth: 2400 },
  { name: 'south_cabo_rojo_lighthouse.jpg', maxWidth: 1200 },
  { name: 'ponce_city_hall.jpg', maxWidth: 1200 },
  { name: 'ponce_colorful_lion.jpg', maxWidth: 1200 },
  { name: 'ponce_parque_bombas.jpg', maxWidth: 1200 },
  { name: 'rincon_sunset_beach.jpg', maxWidth: 1200 },
  { name: 'rincon_beach.jpg', maxWidth: 1200 },
  { name: 'rincon_house_water.jpg', maxWidth: 1200 },
];

async function optimizeImages() {
  for (const img of imagesToOptimize) {
    const inputPath = path.join(publicDir, img.name);
    const backupPath = path.join(publicDir, `${img.name}.backup`);

    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${img.name} - file not found`);
      continue;
    }

    // Create backup if it doesn't exist
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
      console.log(`Created backup: ${img.name}.backup`);
    }

    try {
      await sharp(inputPath)
        .resize(img.maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: 85, progressive: true })
        .toFile(inputPath + '.optimized');

      // Get file sizes
      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(inputPath + '.optimized').size;

      // Replace original with optimized
      fs.renameSync(inputPath + '.optimized', inputPath);

      console.log(`✓ ${img.name}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(optimizedSize / 1024 / 1024).toFixed(2)}MB`);
    } catch (error) {
      console.error(`Error optimizing ${img.name}:`, error.message);
    }
  }

  console.log('\nOptimization complete!');
}

optimizeImages();
