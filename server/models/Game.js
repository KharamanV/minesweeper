const mongoose = require('mongoose');
const Preset = mongoose.model('Preset');
const UserChallenge = mongoose.model('UserChallenge');
const { Schema } = mongoose;
const {
  getRandom2DArrayIndexes,
  generate2DArray,
  getRandomArrayElement,
  getRandomInt,
} = require('../services/utils');

// TODO: Rewrite all mongoose models to classes (e.g. class GameSchema {})
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
   * Reveals square
   * @todo: Make revealedSquares array for all type of response
   *
   * @param x
   * @param y
   * @returns {*}
   */
  async revealSquare(x, y) {
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

    this.visitedSquares.push({ x, y, adjacentMinesCount });

    if (mine) {
      const userChallenge = await UserChallenge.findOne({ gameId: String(this._id) });

      userChallenge.isOver = true;
      this.isOver = true;

      await userChallenge.save();
    }

    if (isEmpty) {
      data.revealedSquares = this.getSafeSquaresAround(x, y);
    }

    const nonMineSquaresCount = this.width * this.height - this.mines.length;
    const isGameWon = this.visitedSquares.length === nonMineSquaresCount;

    if (this.visitedSquares.length > nonMineSquaresCount) console.log('FUCKED UP');

    if (isGameWon) {
      const userChallenge = await UserChallenge.findOne({ gameId: this._id })
        .populate('challenge');

      data.isWon = true;
      userChallenge.gameId = null;
      userChallenge.isOver = userChallenge.challenge.presets.length - 1 === userChallenge.activeStage;
      this.winner = userChallenge.user;
      this.isOver = true;

      await userChallenge.save();
    }

    await this.save();

    return { data, status: 200 };
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

  /**
   * Reveals all adjacent squares when clicking on empty square (recursively)
   *
   * @param x
   * @param y
   * @returns {[null]}
   */
  getSafeSquaresAround(x, y) {
    const squares = [...this.visitedSquares];
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
        const square = { adjacentMinesCount, x: i, y: j };

        squares.push(square);
        this.visitedSquares.push(square);

        if (adjacentMinesCount === 0 && !this.mines.find(isPositionEqual(i, j))) {
          visitedEmptySquares.push({ x: i, y: j });
        }
      });
    } while (visitedEmptySquares.length !== 0);

    return squares;
  }
};

/**
 * Static methods
 */
GameSchema.statics = {
  async create(preset, isPat) {
    const { width, height, minesCount } = await Preset.findOne({ _id: preset });
    const game = new this({ width, height });

    return await game.generateMines(minesCount, isPat).save();
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
    || mine.x === x - 1 && mine.y === y
  );
}

/**
 * Returns mines in a specific location to form a stalemate
 * @todo: Create a real generation algorithm instead of preset patterns in SMALL PAT SITUATIONS
 * @todo: Optimize standard pat situations algorithm
 *
 * @param width
 * @param height
 * @param minesCount
 * @returns {*}
 */
function generatePatSituation({ width, height, minesCount }) {
  const isSmall = minesCount < 5 || width < 5 && height < 5;

  return isSmall ? getSmallPatSituation(width, height) : getStalemate(width, height);
}

function getStalemate(width, height) {
  const isSmall = getRandomArrayElement([true, false]);

  if (isSmall) {
    return getSmallPatSituation(width, height);
  }

  const PAT_SIZE = 4;
  const patSquares = [];
  const mines = [];
  const axis = getRandomArrayElement([
    { x: true },
    { y: true },
  ]);

  if (axis.y) {
    const edge = getRandomArrayElement([0, height - 1]);
    const startXPoint = getRandomInt(0, width - PAT_SIZE);
    const patMines = [
      { x: startXPoint, y: edge },
      { x: startXPoint + 1, y: edge, isPat: true },
      { x: startXPoint + 3, y: edge },
      { x: startXPoint, y: edge ? edge - 1 : edge + 1 },
      { x: startXPoint + 3, y: edge ? edge - 1 : edge + 1 },
    ];

    patSquares.push({ x: startXPoint + 2, y: edge });
    mines.push(...patMines);
  }

  if (axis.x) {
    const edge = getRandomArrayElement([0, width - 1]);
    const startYPoint = getRandomInt(0, height - PAT_SIZE);
    const patMines = [
      { x: edge, y: startYPoint },
      { x: edge, y: startYPoint + 1, isPat: true },
      { x: edge, y: startYPoint + 3 },
      { x: edge ? edge - 1 : edge + 1, y: startYPoint },
      { x: edge ? edge - 1 : edge + 1, y: startYPoint + 3 },
    ];

    patSquares.push({ x: edge, y: startYPoint + 2 });
    mines.push(...patMines);
  }

  const situation = { mines, patSquares };

  return Object.assign(
    situation,
    { lockedRange: getLockedRangeOfSituation(situation, width, height) }
  );
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
      patSquares: [{ x: 0, y: 0 }],
    },
    {
      mines: [
        { x: 0, y: 1, isPat: true },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
      patSquares: [{ x: 0, y: 0 }],
    },
    {
      mines: [
        { x: 0, y: height - 2, isPat: true },
        { x: 0, y: height - 3 },
        { x: 1, y: height - 3 },
      ],
      patSquares: [{ x: 0, y: height - 1 }],
    },
    {
      mines: [
        { x: width - 2, y: 0, isPat: true },
        { x: width - 3, y: 0 },
        { x: width - 3, y: 1 },
      ],
      patSquares: [{ x: width - 1, y: 0 }],
    },
    {
      mines: [
        { x: width - 2, y: height - 1, isPat: true },
        { x: width - 3, y: height - 1 },
        { x: width - 3, y: height - 2 },
      ],
      patSquares: [{ x: width - 1, y: height - 1 }],
    },
    {
      mines: [
        { x: width - 1, y: 1, isPat: true },
        { x: width - 1, y: 2 },
        { x: width - 2, y: 2 },
      ],
      patSquares: [{ x: width - 1, y: 0 }],
    },
    {
      mines: [
        { x: width - 1, y: height - 2, isPat: true },
        { x: width - 1, y: height - 3 },
        { x: width - 2, y: height - 3 },
      ],
      patSquares: [{ x: width - 1, y: height - 1 }],
    },
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
