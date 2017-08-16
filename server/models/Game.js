const mongoose = require('mongoose');
const { Schema } = mongoose;
const { getRandom2DArrayIndexes, generateBlankBoard } = require('../services/utils');

const GameSchema = new Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  // TODO: Add Position model with adjacentMines virtual
  mines: { type: [], default: [] },
  visitedSquares: { type: [], default: [] },
  startDate: { type: Date, default: Date.now, required: true },
  isOver: { type: Boolean, default: false },
  winner: { type: Schema.Types.ObjectId, default: null },
});

/**
 * Game methods
 */
GameSchema.methods = {
  revealSquare(x, y) {
    if (this.isOver) {
      return { status: 400, data: 'This game is already over' };
    }

    if (!this.isArgumentsValid(x, y)) {
      return { status: 400, data: 'There is no such square' };
    }

    if (this.visitedSquares.find(isPositionEqual(x, y))) {
      return { status: 400, data: 'This square was already revealed' };
    }

    const mine = this.mines.find(isPositionEqual(x, y));

    if (mine) {
      // TODO: Add winner
      this.isOver = true;
    }

    this.visitedSquares.push({ x, y });

    return this.save()
      .then(game => ({
        status: 200,
        data: {
          x,
          y,
          isMine: !!mine,
          adjacentMinesCount: !mine ? this.getAdjacentMinesCount(x, y) : null,
        },
      }));
  },

  /**
   * Get count of neighboring mines
   *
   * @param x
   * @param y
   */
  getAdjacentMinesCount(x, y) {
    return this.mines
      .filter(isMineAdjacent(x, y))
      .length;
  },

  isArgumentsValid(x, y) {
    return (
      x >= 0
      && y >= 0
      && this.width > x
      && this.height > y
    );

  },

  /**
   * Randomly set mines on the board
   *
   * @param count
   * @returns {Schema.methods}
   */
  generateMines(count) {
    const { width, height } = this;
    const board = generateBlankBoard(width, height);
    let minesLeft = count;

    while (minesLeft > 0) {
      const { x, y } = getRandom2DArrayIndexes(width, height);

      if (board[x][y]) {
        this.mines.push({ x, y });

        board[x][y] = false;
        minesLeft -= 1;
      }
    }

    return this;
  },
};

module.exports = mongoose.model('Game', GameSchema);

function isPositionEqual(x, y) {
  return element => element.x === x && element.y === y;
}

function isMineAdjacent(x, y) {
  return mine => (
    mine.x === x - 1 && mine.y === y - 1
    || mine.x === x && mine.y === y - 1
    || mine.x === x + 1 && mine.y === y -1
    || mine.x === x + 1 && mine.y === y
    || mine.x === x + 1 && mine.y === y + 1
    || mine.x === x && mine.y === y + 1
    || mine.x === x - 1 && mine.y === y + 1
  )
}
