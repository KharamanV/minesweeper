const Challenge = require('mongoose').model('Challenge');
const presets = [[], [], [], [], [], []];
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
  await Challenge.remove();

  for (let i = 0; i < bets.length; i++) {
    const challenge = new Challenge({
      name: names[i],
      presets: presets[i],
      bet: bets[i],
    });

    await challenge.save();
  }

  console.log('[Fixtures]: Challenges created');
};
