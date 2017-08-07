const mongoose = require('mongoose');
const { Schema } = mongoose;
const  Position = require('./Position');

const GameSchema = new Schema({
  startDate: { type: Date, default: Date.now, required: true },
  size: { type: Number, required: true },
  mines: [Position],
  revealedSquares: [Position],
  isOver: { type: Boolean, default: false },
  winner: { type: Schema.Types.ObjectId, default: null },
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
