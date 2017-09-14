const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserChallengeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  challenge: { type: Schema.Types.ObjectId, ref: 'Challenge', required: true },
  gameId: { type: Schema.Types.Mixed, default: null },
  activeStage: { type: Number, default: 0 },
  isOver: { type: Boolean, default: false },
});

module.exports = mongoose.model('UserChallenge', UserChallengeSchema);
