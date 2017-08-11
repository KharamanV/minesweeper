const mongoose = require('mongoose');
const { Schema } = mongoose;

const PresetSchema = new Schema({
  name: String,
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  minesCount: { type: Number, required: true },
  rewardMultiplier: Number,
});

module.exports = mongoose.model('Preset', PresetSchema);
