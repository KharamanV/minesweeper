const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const Preset = mongoose.model('Preset');
const router = require('express').Router();
const gameFields = {
  width: 1,
  height: 1,
  startDate: 1,
  time: 1,
  isWon: 1,
  user: 1,
  clicks: 1,
};

router.get('/', getStats);
router.get('/:id', getStatsById);

module.exports = router;

async function getStats(req, res) {
  try {
    const { preset: presetId } = req.query;
    let gameQuery = null;

    if (presetId) {
      const { width, height, minesCount } = await Preset.findById(presetId);

      gameQuery = Game.find({
        width,
        height,
        isOver: true,
        mines: { $size: minesCount },
      });
    } else {
      gameQuery = Game.find({ isOver: true });
    }

    const games = await gameQuery
      .sort('-startDate')
      .select(gameFields)
      .populate('user', 'username');

    res.json(games);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

function getStatsById(req, res) {
  const { id } = req.params;

  Game.findById(id)
    .select(Object.assign(gameFields, { visitedSquares: 1 }))
    .populate('user', 'username')
    .then(game => res.json(game))
    .catch(err => res.status(500).json(err.message));
}
