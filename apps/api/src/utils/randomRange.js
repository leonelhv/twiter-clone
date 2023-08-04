function randomRange (min, max) {
  return new Promise((resolve, reject) => {
    try {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      resolve(randomNumber);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = randomRange;
