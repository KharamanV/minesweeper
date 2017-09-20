/* eslint-disable */
export const createBoard = ({ width, height, visitedSquares }) => {
  const board = [];
  let squareId = 0;

  for (let i = 0; i < height; i += 1) {
    const row = new Array(width).fill({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMinesCount: null,
    })
      .map(square => ({ ...square, id: squareId += 1 }));

    board.push(row);
  }

  visitedSquares.forEach(({ x, y, adjacentMinesCount }) => {
    const square = { adjacentMinesCount, isRevealed: true };

    board[y][x] = { ...board[y][x], ...square };
  });

  return board;
}
