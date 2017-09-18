const Preset = require('mongoose').model('Preset');
const widths = [3, 4, 5, 9, 4, 6, 9, 12, 4, 8, 12, 16, 5, 9, 12, 16, 5, 10, 15, 16, 6, 12, 16, 16];
const heights = [3, 4, 5, 9, 4, 6, 9, 12, 4, 8, 12, 16, 5, 9, 12, 16, 5, 10, 15, 20, 6, 12, 16, 30];
const minesAmounts = [1, 3, 5, 10, 3, 7, 10, 14, 3, 13, 14, 20, 5, 10, 14, 20, 5, 12, 18, 24, 7, 22, 33, 99];
const patChance = [0, 0.2, 0.4, 0.6, 0.2, 0.4, 0.6, 0.6, 0.5, 0.5, 0.5, 0.6, 0.2, 0.5, 0.7, 0.7, 0.2, 0.5, 0.7, 0.7, 0.5, 0.5, 0.7, 0.7];
const rewardRates = [0.5, 1.5, 3, 6, 0.75, 2, 4, 8, 0.9, 3, 6, 9, 1, 2.5, 5, 10, 1.1, 3, 6, 12, 2, 5, 10, 25];

module.exports = async () => {
  await Preset.remove();

  for (let i = 0; i < widths.length; i++) {
    const preset = new Preset({
      width: widths[i],
      height: heights[i],
      minesCount: minesAmounts[i],
      patChance: patChance[i],
      rewardMultiplier: rewardRates[i],
    });

    await preset.save();
  }

  console.log('[Fixtures]: Presets created');
};
