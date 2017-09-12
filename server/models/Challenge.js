const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChallengeSchema = new Schema({
  presets: [{ type: Schema.Types.ObjectId, ref: 'Preset' }],
  bet: { type: Number, required: true },
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
