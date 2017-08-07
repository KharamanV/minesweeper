const mongoose = require('mongoose');
const { Schema } = mongoose;

const PositionSchema = new Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  date: Date,
});

module.exports = PositionSchema;
