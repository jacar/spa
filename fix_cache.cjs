const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      const dirFile = path.join(dir, file);
      if (fs.statSync(dirFile).isDirectory()) {
        filelist = walkSync(dirFile, filelist);
      } else if (dirFile.endsWith('.tsx')) {
        filelist.push(dirFile);
      }
    });
  }
  return filelist;
};

const files = walkSync(path.join(__dirname, 'components')).concat(walkSync(path.join(__dirname, 'pages')));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let updated = false;
  
  if (content.includes("fetch('/api/content')")) {
    content = content.replace(/fetch\('\/api\/content'\)/g, "fetch('/api/content?t=' + Date.now())");
    updated = true;
  }
  if (content.includes("axios.get('/api/content')")) {
    content = content.replace(/axios\.get\('\/api\/content'\)/g, "axios.get('/api/content?t=' + Date.now())");
    updated = true;
  }
  
  if (updated) {
    fs.writeFileSync(file, content);
    console.log('Updated: ' + file);
  }
});
