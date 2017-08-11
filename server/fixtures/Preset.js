const Preset = require('mongoose').model('Preset');
const names = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];
const widths = [3, 4, 5, 9];
const heights = [3, 4, 5, 9];
const minesAmounts = [1, 2, 4, 5];
const rewardRates = [0.75, 1.5, 3, 6];

module.exports = () => {
  for (let i = 0; i < widths.length; i++) {
    const preset = new Preset({
      name: names[i],
      width: widths[i],
      height: heights[i],
      minesCount: minesAmounts[i],
      rewardMultiplier: rewardRates[i],
    });

    preset.save();
  }
};
