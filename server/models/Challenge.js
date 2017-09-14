const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChallengeSchema = new Schema({
  name: String,
  presets: [{ type: Schema.Types.ObjectId, ref: 'Preset' }],
  bet: { type: Number, required: true },
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
