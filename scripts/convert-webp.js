import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.resolve('images');

const imagesToConvert = [
  'resultado-clinico-01.jpg',
  'resultado-clinico-02.jpg',
  'resultado-clinico-04.jpg',
  'resultado-clinico-08.jpg',
  'resultado-clinico-09.jpg',
  'resultado-clinico-10.jpg',
  'resultado-clinico-11.jpg',
  'resultado-clinico-12.jpg',
  'mapeamento-facial-real.jpg',
  'hero-protocolo-desktop.jpg',
  'hero-protocolo-mobile.jpg'
];

async function convert() {
  console.log('--- Iniciando conversão para WebP de alta fidelidade ---');
  let totalOrig = 0;
  let totalWebp = 0;

  for (const imgName of imagesToConvert) {
    const inputPath = path.join(imagesDir, imgName);
    const outputPath = path.join(imagesDir, imgName.replace(/\.jpg$/, '.webp'));

    if (!fs.existsSync(inputPath)) {
      console.warn(`Arquivo não encontrado: ${inputPath}`);
      continue;
    }

    const statOrig = fs.statSync(inputPath);
    totalOrig += statOrig.size;

    await sharp(inputPath)
      .webp({ quality: 84, effort: 6 })
      .toFile(outputPath);

    const statWebp = fs.statSync(outputPath);
    totalWebp += statWebp.size;

    const diffPercent = (((statOrig.size - statWebp.size) / statOrig.size) * 100).toFixed(1);
    console.log(`✓ ${imgName} (${(statOrig.size / 1024).toFixed(0)} KB) -> ${(statWebp.size / 1024).toFixed(0)} KB (-${diffPercent}%)`);
  }

  console.log('---------------------------------------------------------');
  console.log(`Tamanho Total Original: ${(totalOrig / 1024).toFixed(0)} KB`);
  console.log(`Tamanho Total WebP:     ${(totalWebp / 1024).toFixed(0)} KB`);
  console.log(`Economia de Banda:      -${(((totalOrig - totalWebp) / totalOrig) * 100).toFixed(1)}%`);
}

convert().catch(err => {
  console.error('Erro na conversão:', err);
  process.exit(1);
});
