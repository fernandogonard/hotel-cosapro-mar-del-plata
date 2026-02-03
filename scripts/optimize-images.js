const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../assets');

// Configuración de optimización
const imageConfigs = [
  { name: 'hero.jpg', sizes: [1200, 800, 600] },
  { name: 'hotel-1.jpg', sizes: [800, 600, 400] },
  { name: 'hotel-2.jpg', sizes: [800, 600, 400] },
  { name: 'hotel-3.jpg', sizes: [800, 600, 400] },
  { name: 'logo-diva.png', sizes: [200, 150] },
  { name: 'logo-cosapro.png', sizes: [300, 200] }
];

async function optimizeImages() {
  console.log('🖼️  Iniciando optimización de imágenes a WebP...\n');

  for (const config of imageConfigs) {
    const inputPath = path.join(assetsDir, config.name);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  No encontrado: ${config.name}`);
      continue;
    }

    console.log(`📦 Procesando: ${config.name}`);

    // Crear versiones WebP para cada tamaño
    for (const size of config.sizes) {
      const outputName = `${path.basename(config.name, path.extname(config.name))}-${size}w.webp`;
      const outputPath = path.join(assetsDir, outputName);

      try {
        await sharp(inputPath)
          .resize(size, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        console.log(`  ✅ ${outputName} (${(stats.size / 1024).toFixed(1)} KB)`);
      } catch (error) {
        console.error(`  ❌ Error: ${outputName}`, error.message);
      }
    }

    // Crear versión WebP optimizada del original (sin redimensionar)
    const outputName = `${path.basename(config.name, path.extname(config.name))}.webp`;
    const outputPath = path.join(assetsDir, outputName);

    try {
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      const originalStats = fs.statSync(inputPath);
      const reduction = (((originalStats.size - stats.size) / originalStats.size) * 100).toFixed(1);
      
      console.log(`  ✅ ${outputName} (${(stats.size / 1024).toFixed(1)} KB, -${reduction}%)\n`);
    } catch (error) {
      console.error(`  ❌ Error: ${outputName}`, error.message);
    }
  }

  console.log('✨ ¡Optimización completada!\n');
  console.log('📋 Próximos pasos:');
  console.log('1. Actualiza index.html con srcset responsivo');
  console.log('2. Prueba las imágenes en el navegador');
  console.log('3. Commit y push a GitHub\n');
}

optimizeImages().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
