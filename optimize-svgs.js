import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

// Find all SVG files in public/
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.svg'));

for (const file of files) {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find image tag with base64 data (matches both href and xlink:href)
  const imgRegex = /(href|xlink:href)="data:(image\/(jpeg|png));base64,([^"]+)"/i;
  const match = content.match(imgRegex);

  if (match) {
    const attribute = match[1];
    const mimeType = match[2];
    const extension = match[3] === 'jpeg' ? 'jpg' : match[3];
    const base64Data = match[4];

    const tempInput = path.join(__dirname, `temp_input_${file}.${extension}`);
    fs.writeFileSync(tempInput, Buffer.from(base64Data, 'base64'));

    const originalSize = fs.statSync(tempInput).size;

    try {
      // Resize using sips (max width/height 240px is perfect for 110x162 display)
      execSync(`sips -Z 240 "${tempInput}"`, { stdio: 'ignore' });

      const optimizedBase64 = fs.readFileSync(tempInput).toString('base64');
      const optimizedSize = fs.statSync(tempInput).size;

      // Replace the base64 data in the SVG content
      const oldString = `${attribute}="data:${mimeType};base64,${base64Data}"`;
      const newString = `${attribute}="data:${mimeType};base64,${optimizedBase64}"`;
      content = content.replace(oldString, newString);

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Optimized ${file}: ${originalSize} bytes -> ${optimizedSize} bytes (SVG final: ${fs.statSync(filePath).size} bytes)`);
    } catch (err) {
      console.error(`Failed to optimize ${file}:`, err.message);
    } finally {
      if (fs.existsSync(tempInput)) {
        fs.unlinkSync(tempInput);
      }
    }
  }
}

// Clean up temporary file if any
const tempJpg = path.join(__dirname, 'temp.jpg');
if (fs.existsSync(tempJpg)) {
  fs.unlinkSync(tempJpg);
}
