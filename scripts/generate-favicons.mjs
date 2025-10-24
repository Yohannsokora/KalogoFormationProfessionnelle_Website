import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const publicDir = path.resolve(process.cwd(), 'public');
const srcSvg = path.join(publicDir, 'favicon.svg');

async function ensureExists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await ensureExists(srcSvg))) {
    console.error('Source favicon.svg not found in /public. Aborting.');
    process.exit(1);
  }

  const targets = [
    { size: 16, name: 'favicon-16.png' },
    { size: 32, name: 'favicon-32.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'icon-192.png' },
    { size: 512, name: 'icon-512.png' }
  ];

  // Render PNGs from SVG
  await Promise.all(
    targets.map(async ({ size, name }) => {
      const out = path.join(publicDir, name);
      const buf = await sharp(srcSvg)
        .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .png({ compressionLevel: 9 })
        .toBuffer();
      await fs.writeFile(out, buf);
      console.log('Generated', name);
    })
  );

  // Create favicon.ico from 16 and 32 pngs
  const icoBuf = await pngToIco([
    path.join(publicDir, 'favicon-16.png'),
    path.join(publicDir, 'favicon-32.png')
  ]);
  await fs.writeFile(path.join(publicDir, 'favicon.ico'), icoBuf);
  console.log('Generated favicon.ico');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
