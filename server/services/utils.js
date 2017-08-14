function getRandom2DArrayIndexes(width, height) {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);

  return { x, y };
}

function generateBlankBoard(width, height) {
  const board = [];

  for (let i = 0; i < height; i++) {
    board.push(new Array(width).fill(true));
  }

  return board;
}

module.exports = {
  getRandom2DArrayIndexes,
  generateBlankBoard,
};