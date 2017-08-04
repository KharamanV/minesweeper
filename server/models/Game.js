const mongoose = require('mongoose');
const { Schema } = mongoose;
const Square = require('./Square');

const GameSchema = new Schema({
  startDate: { type: Date, default: Date.now, required: true },
  size: { type: Number, required: true },
  // array of mines position
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
    } else {
      board[x][y].isRevealed = true;

      this.markModified('board');
    }

    return this.save()
      .then(game => Object.assign(game.board[x][y], { x, y }));
  }
};

module.exports = mongoose.model('Game', GameSchema);
