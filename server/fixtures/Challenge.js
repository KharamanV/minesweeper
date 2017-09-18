const mongoose = require('mongoose');
const Challenge = mongoose.model('Challenge');
const Preset = mongoose.model('Preset');
const names = [
  'Challenge #1',
  'Challenge #2',
  'Challenge #3',
  'Challenge #4',
  'Challenge #5',
  'Challenge #6',
];
const bets = [1, 5, 10, 25, 50, 100];

module.exports = async () => {
  const STAGES_PER_CHALLENGE = 4;
  const presets = await Preset.find({});
  const presetsIds = presets.map(({ _id }) => _id);

  await Challenge.remove();

  for (let i = 0; i < bets.length; i++) {
    const challenge = new Challenge({
      name: names[i],
      presets: presetsIds.splice(0, STAGES_PER_CHALLENGE),
      bet: bets[i],
    });

    await challenge.save();
  }

  console.log('[Fixtures]: Challenges created');
};
