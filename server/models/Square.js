const mongoose = require('mongoose');
const { Schema } = mongoose;

const SquareSchema = new Schema({
  isMine: { type: Boolean, default: false },
  isResolved: { type: Boolean, default: false },
  isFlagged: { type: Boolean, default: false },
  isEmpty: { type: Boolean, default: false },
  adjacentMinesCount: { type: Schema.Types.Mixed, default: null },
});

module.exports = SquareSchema;
