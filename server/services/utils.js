function getRandom2DArrayIndexes(width, height) {
  const x = getRandomInt(0, width - 1);
  const y = getRandomInt(0, height - 1);

  return { x, y };
}

function generate2DArray({ width, height, fill = null }) {
  const board = [];

  for (let i = 0; i < height; i++) {
    board.push(new Array(width).fill(fill));
  }

  return board;
}

function getRandomArrayElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  getRandom2DArrayIndexes,
  generate2DArray,
  getRandomInt,
  getRandomArrayElement,
};
