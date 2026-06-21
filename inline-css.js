import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const htmlPath = path.join(distDir, 'index.html');

if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Find the index-*.css link in index.html
  // Example: <link rel="stylesheet" crossorigin href="/publicweb/assets/index-B8tcnjzK.css">
  const cssRegex = /<link\s+[^>]*href=["']\/publicweb\/assets\/(index-[^"']+\.css)["'][^>]*>/i;
  const match = html.match(cssRegex);

  if (match) {
    const cssLinkTag = match[0];
    const cssFileName = match[1];
    const cssPath = path.join(distDir, 'assets', cssFileName);

    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, 'utf8');
      
      // Inline the CSS content
      html = html.replace(cssLinkTag, `<style>${cssContent}</style>`);
      fs.writeFileSync(htmlPath, html, 'utf8');
      
      // Delete the external CSS file since it is now inlined
      fs.unlinkSync(cssPath);
      console.log(`Successfully inlined CSS: ${cssFileName}`);
    } else {
      console.log(`CSS file not found at path: ${cssPath}`);
    }
  } else {
    console.log('No matching CSS link tag found in index.html');
  }
} else {
  console.log('dist/index.html not found');
}
