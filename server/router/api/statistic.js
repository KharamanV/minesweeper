const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const Preset = mongoose.model('Preset');
const Challenge = mongoose.model('Challenge');
const UserChallenge = mongoose.model('UserChallenge');
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
router.get('/challenges', getChallengesStats);
router.get('/:id', getStatsById);

module.exports = router;

async function getStats(req, res) {
  try {
    const { preset, challenge } = req.query;
    let gameQuery = null;

    if (!preset && !challenge) {
      gameQuery = Game.find({ isOver: true });
    }

    if (preset) {
      const { width, height, minesCount } = await Preset.findById(preset);

      gameQuery = Game.find({
        width,
        height,
        isOver: true,
        mines: { $size: minesCount },
      });
    }

    if (challenge) {
      gameQuery = Game.find({ challenge });
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

async function getChallengesStats(req, res) {
  try {
    const challenges = await Challenge.find()
      .select('-presets');

    for (let i = 0; i < challenges.length; i++) {
      const challenge = Object.assign({}, challenges[i].toObject());
      const selector = { challenge: challenge._id };
      const players = await UserChallenge.distinct('user');

      challenge.gamesCount = await Game.count(selector);
      challenge.playersCount = players.length;

      challenge.lastGame = await Game.findOne(selector)
        .select(gameFields)
        .sort('-startDate');

      challenges[i] = challenge;
    }

    return res.json(challenges);
  } catch (err) {
    return res.status(500).json(err.message);
  }
}

