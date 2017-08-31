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
  winner: { type: Schema.Types.ObjectId, ref: 'User' },
});

/**
 * Game methods
 */
GameSchema.methods = {
  /**
   * @todo: Make revealedSquares array for all type of response
   *
   * @param x
   * @param y
   * @returns {*}
   */
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

    const patSquare = this.patSquares.find(isPositionEqual(x, y));

    if (patSquare) {
      const patMineIndex = this.mines.findIndex(mine => mine.isPat);

      this.mines.splice(patMineIndex, 1);
      this.mines.unshift(patSquare);
    }

    const mine = this.mines.find(isPositionEqual(x, y));
    const adjacentMinesCount = this.getAdjacentMinesCount(x, y);
    const isEmpty = !mine && adjacentMinesCount === 0;
    const data = { x, y, adjacentMinesCount, isMine: !!mine };

    this.visitedSquares.push({ x, y });

    if (mine) {
      // TODO: Add winner
      this.isOver = true;
    }

    if (isEmpty) {
      data.revealedSquares = this.getSafeSquaresAround(x, y);
    }

    return this.save()
      .then(() => ({ data, status: 200 }));
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

  /**
   * Verifies are coordinates valid for this game
   *
   * @param x
   * @param y
   * @returns {boolean}
   */
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

      if (board[y][x]) {
        this.mines.push({ x, y });

        board[y][x] = false;
        minesLeft -= 1;
      }
    }

    return this;
  },

  getSafeSquaresAround(x, y) {
    const squares = [{ x, y, adjacentMinesCount: 0 }];
    const visitedEmptySquares = [{ x, y }];
    const adjacentCoordinates = [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];

    do {
      let { x, y } = visitedEmptySquares.pop();

      adjacentCoordinates.forEach((adj, i) => {
        x = x + adj.x;
        y = y + adj.y;

        if (!this.isArgumentsValid(x, y)) {
          return;
        }

        const adjacentMinesCount = this.getAdjacentMinesCount(x, y);

        squares.push({ x, y, adjacentMinesCount });

        if (adjacentMinesCount === 0 && !this.mines.find(isPositionEqual(x, y))) {
          visitedEmptySquares.push({ x, y });
        }

        console.log({ x, y });
      });
    } while (visitedEmptySquares.length !== 0);

    console.log('out');

    return squares;
  },

  /**
   * Reveals all adjacent squares when clicking on empty square (recursively)
   *
   * @param x
   * @param y
   * @returns {[null]}
   */
  getSafeSquaresAround(x, y) {
    debugger;
    const squares = [{ x, y, adjacentMinesCount: 0 }];
    const visitedEmptySquares = [{ x, y }];
    const adjacentCoordinates = [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];

    do {
      let { x, y } = visitedEmptySquares.pop();

      adjacentCoordinates.forEach(adj => {
        const i = x + adj.x;
        const j = y + adj.y;

        if (!this.isArgumentsValid(i, j) || squares.find(isPositionEqual(i, j))) {
          return;
        }

        const adjacentMinesCount = this.getAdjacentMinesCount(i, j);

        squares.push({ adjacentMinesCount, x: i, y: j });

        if (adjacentMinesCount === 0 && !this.mines.find(isPositionEqual(i, j))) {
          visitedEmptySquares.push({ x: i, y: j });
        }
      });
    } while (visitedEmptySquares.length !== 0);

    return squares;
  }
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
    || mine.x === x - 1 && mine.y === y
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

/**
 * Returns range of 2D array of pat situations
 *
 * @param situation
 * @param width
 * @param height
 * @returns {{x: [*,*], y: [*,*]}}
 */
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
