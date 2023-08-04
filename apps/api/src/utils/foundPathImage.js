const fs = require('fs');
const util = require('util');
const randomRange = require('./randomRange');

const imagesFolderPath = './src/assets';

const readdirAsync = util.promisify(fs.readdir);

async function foundPathImage () {
  try {
    const files = await readdirAsync(imagesFolderPath);
    const randomNumber = await randomRange(0, files.length - 1);
    return `assets/${files[randomNumber]}`;
  } catch (err) {
    console.error('Error al leer el directorio:', err);
    throw err;
  }
}

module.exports = foundPathImage;
