import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, '../public/logo.png');
const output = path.join(__dirname, '../public/icon.png');
const outputIco = path.join(__dirname, '../public/icon.ico');

async function main() {
  await sharp(input)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toFile(output);
  
  console.log('Generado public/icon.png (512x512)');
}

main().catch(console.error);
