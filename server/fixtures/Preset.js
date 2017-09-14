const Preset = require('mongoose').model('Preset');
const names = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];
const widths = [3, 4, 5, 9];
const heights = [3, 4, 5, 9];
const minesAmounts = [1, 3, 5, 10];
const rewardRates = [0.5, 1.5, 3, 6];

module.exports = async () => {
  await Preset.remove();

  for (let i = 0; i < widths.length; i++) {
    const preset = new Preset({
      name: names[i],
      width: widths[i],
      height: heights[i],
      minesCount: minesAmounts[i],
      rewardMultiplier: rewardRates[i],
    });

    await preset.save();
  }

  console.log('[Fixtures]: Presets created');
};
