const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const Challenge = mongoose.model('Challenge');
const router = require('express').Router();

router.get('/', getStats);

module.exports = router;

async function getStats(req, res) {
  try {
    const { preset: presetId } = req.query;
    let gameQuery = null;

    if (presetId) {
      const challenges = await Challenge.find({ presets: presetId })
        .select('presets');
      const challengeIds = [].concat(...challenges.map(({ presets }) => presets))
        .map(id => String(id));

      gameQuery = Game.find({ isOver: true, challenge: { $in: challengeIds } });

      console.log(challengeIds);
    } else {
      gameQuery = Game.find({ isOver: true });
    }

    const games = await gameQuery
      .sort('-startDate')
      .select('width height startDate time isWon user clicks')
      .populate('user', 'username');

    res.json(games);
  } catch (err) {
    res.status(500).json(err.message);
  }
}
