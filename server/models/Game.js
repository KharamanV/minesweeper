const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  mines: { type: [], default: [] },
  visitedSquares: { type: [], default: [] },
  startDate: { type: Date, default: Date.now, required: true },
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
  },

  generateMines(count) {
    const mines = [];

    for (let i = 0; i < count; i++) {
      this.mines.push();
    }

    return this;
  }
};

module.exports = mongoose.model('Game', GameSchema);
