const mongoose = require('mongoose');
const { Schema } = mongoose;
const Square = require('./Square');

const GameSchema = new Schema({
  size: { type: Number, required: true },
  minesCount: { type: Number, required: true },
  isOver: { type: Boolean, default: false },
  isWon: { type: Boolean, default: false },
  board: [[Square]],
});

GameSchema.methods = {
  reveal(x, y) {
    const { board } = this;
    const square = board[x][y];

    if (square.isMine) {
      this.isOver = true;

      return this.save()
        .then(() => ({ status: 'failure' }));
    }

    board[x][y].isRevealed = true;

    this.markModified('board');

    return this.save()
      .then(({ board }) => ({
        status: 'success',
        minesCount: board[x][y].adjacentMinesCount,
      }));
  }
};

module.exports = mongoose.model('Game', GameSchema);
