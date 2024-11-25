import fs from 'fs';
import path from 'path';
import https from 'https';

const imageUrls = {
  hero: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=2400&q=90',
  launches: {
    starlink: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=1920&q=85',
    cargo: 'https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=1920&q=85',
    starship: 'https://images.unsplash.com/photo-1517976384346-3136801d605d?w=1920&q=85'
  }
};

const createDirectories = () => {
  const dirs = [
    'public/images',
    'public/images/hero',
    'public/images/launches'
  ];

  dirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
};

const downloadImage = (url: string, filepath: string) => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Timeout downloading ${url}`));
    }, 30000);

    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (response) => {
      if (response.statusCode === 200) {
        const writeStream = fs.createWriteStream(filepath);
        response.pipe(writeStream);

        writeStream.on('finish', () => {
          clearTimeout(timeout);
          writeStream.close();
          resolve(filepath);
        });

        writeStream.on('error', (err) => {
          clearTimeout(timeout);
          reject(err);
        });
      } else {
        clearTimeout(timeout);
        reject(`Failed to download ${url} (Status: ${response.statusCode})`);
      }
    });

    request.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
};

const downloadWithRetry = async (url: string, filepath: string, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await downloadImage(url, filepath);
      console.log(`✅ Downloaded: ${path.basename(filepath)}`);
      return;
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      console.log(`Retry ${i + 1}/${retries} for ${path.basename(filepath)}`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }
};

const cleanupDirectories = () => {
  const dirs = [
    'public/images/hero',
    'public/images/launches'
  ];

  dirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`🧹 Cleaned up ${dir}`);
    }
  });
};

const main = async () => {
  try {
    console.log('🧹 Cleaning up old images...');
    cleanupDirectories();
    
    console.log('🚀 Starting image download...');
    createDirectories();

    // Download hero image
    await downloadWithRetry(
      imageUrls.hero,
      path.join(process.cwd(), 'public/images/hero/hero-main.jpg')
    );

    // Download launch images
    for (const [key, url] of Object.entries(imageUrls.launches)) {
      await downloadWithRetry(
        url,
        path.join(process.cwd(), `public/images/launches/${key}-mission.jpg`)
      );
    }

    console.log('✨ All images downloaded successfully!');
  } catch (error) {
    console.error('❌ Error downloading images:', error);
    process.exit(1);
  }
};

main(); 