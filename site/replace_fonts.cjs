const fs = require('fs');
const path = 'src/routes/tools/+page.svelte';
let content = fs.readFileSync(path, 'utf-8');

// Replace DM Sans and Playfair Display
content = content.replace(/font-family:\s*'DM Sans',\s*sans-serif;/g, "font-family: 'Roboto', sans-serif;");
content = content.replace(/font-family:\s*'Playfair Display',\s*serif;/g, "font-family: 'Roboto', sans-serif;");

// Replace Arial variants
content = content.replace(/font-family:\s*Arial,\s*Helvetica,\s*sans-serif/g, "font-family: 'Roboto', Arial, Helvetica, sans-serif");
content = content.replace(/font-family:Arial,Helvetica,sans-serif/g, "font-family:'Roboto',Arial,Helvetica,sans-serif");
content = content.replace(/font-family:Arial,sans-serif/g, "font-family:'Roboto',Arial,sans-serif");

// Replace Google Font link
content = content.replace(
  /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Playfair\+Display[^"]+" rel="stylesheet" \/>/g,
  '<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />'
);

fs.writeFileSync(path, content);
console.log('Font replaced successfully');
