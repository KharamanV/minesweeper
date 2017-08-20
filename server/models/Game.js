const mongoose = require('mongoose');
const { Schema } = mongoose;
const {
  getRandom2DArrayIndexes,
  generate2DArray,
  getRandomArrayElement,
} = require('../services/utils');

const GameSchema = new Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  // TODO: Add Position model with adjacentMines virtual
  mines: { type: [], default: [] },
  patSquares: { type: [], default: [] },
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
   * @param isPat
   * @returns {*}
   */
  generateMines(count, isPat = false) {
    const { width, height } = this;
    const board = generate2DArray({ width, height, fill: true });
    let minesLeft = count;

    if (isPat) {
      const {
        mines,
        patSquares,
        lockedRange,
      } = generatePatSituation({ width, height, minesCount: count });

      this.mines.push(...mines);
      this.patSquares.push(patSquares);

      for (let i = lockedRange.y[0]; i <= lockedRange.y[1]; i++) {
        for (let j = lockedRange.x[0]; j <= lockedRange.x[1]; j++) {
          board[i][j] = false;
        }
      }

      minesLeft -= mines.length;
    }

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
    || mine.x === x + 1 && mine.y === y - 1
    || mine.x === x + 1 && mine.y === y
    || mine.x === x + 1 && mine.y === y + 1
    || mine.x === x && mine.y === y + 1
    || mine.x === x - 1 && mine.y === y + 1
  );
}

/**
 * Returns mines in a specific location to form a stalemate
 * @todo: Create a real generation algorithm instead of preset patterns
 *
 * @param options
 * @returns {{mines: Array, patSquares: Array, lockedRange: *}}
 */
function generatePatSituation({ width, height, minesCount }) {
  const isSmall = minesCount < 5 || width < 5 && height < 5;

  return getSmallPatSituation(width, height);
}

function getSmallPatSituation(width, height) {
  const situations = [
    {
      mines: [
        { x: 1, y: height - 1, isPat: true },
        { x: 2, y: height - 1 },
        { x: 2, y: height - 2 },
      ],
      patSquares: [{ x: 0, y: height - 1 }],
    },
    {
      mines: [
        { x: 1, y: 0, isPat: true },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
      ],
      patSquares: { x: 0, y: 0 },
    },
    {
      mines: [
        { x: 0, y: 1, isPat: true },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
      patSquares: { x: 0, y: 0 },
    }
  ];

  const randomSituation = getRandomArrayElement(situations);

  return Object.assign(
    randomSituation,
    { lockedRange: getLockedRangeOfSituation(randomSituation, width, height) }
  );
}

function getLockedRangeOfSituation({ mines, patSquares }, width, height) {
  const items = mines.concat(patSquares);
  const minX = items.reduce((min, curr) => min.x > curr.x ? curr : min);
  const maxX = items.reduce((max, curr) => max.x < curr.x ? curr : max);
  const minY = items.reduce((min, curr) => min.y > curr.y ? curr : min);
  const maxY = items.reduce((max, curr) => max.y < curr.y ? curr : max);
  const left = minX.x - 2;
  const right = maxX.x + 2;
  const top = minY.y - 2;
  const bottom = maxY.y + 2;

  return {
    x: [left < 0 ? 0 : left, right >= width ? width - 1 : right],
    y: [top < 0 ? 0 : top, bottom >= height ? height - 1 : bottom],
  };
}
