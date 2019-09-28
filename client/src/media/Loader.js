const path = './images';
const images = [
  'blue-3x4.png',
  'blue-square.png',
  'dots-3x4.png',
  'orange-square.png',
  'pink-4x3.png',
  'striped-4x3.png',
];

module.exports = {
  getImageUrl: () => {
    const index = Math.floor(Math.random() * images.length);
    return `${path}/${images[index]}`;
  },
};
