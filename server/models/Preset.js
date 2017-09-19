const mongoose = require('mongoose');
const { Schema } = mongoose;

const PresetSchema = new Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  minesCount: { type: Number, required: true },
  rewardMultiplier: Number,
  patChance: { type: Number, default: 0, required: true, select: false },
});

module.exports = mongoose.model('Preset', PresetSchema);
