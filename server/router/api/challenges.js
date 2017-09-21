const router = require('express').Router();
const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const Preset = mongoose.model('Preset');
const Challenge = mongoose.model('Challenge');
const UserChallenge = mongoose.model('UserChallenge');
const { generate2DArray } = require('../../services/utils');

router.get('/', getChallenges);
router.get('/:id', getChallenge);
router.put('/:id', editChallenge)
router.get('/:id/user', getUserChallenge);
router.post('/:id/play', playChallenge);
router.post('/:id/withdraw', withdrawChallenge);

module.exports = router;

function getChallenges(req, res) {
  Challenge.find()
    .then(challenges => res.json(challenges))
    .catch(err => res.status(500).json(err.message));
}

function getChallenge(req, res) {
  Challenge.findOne({ _id: req.params.id })
    .populate('presets')
    .then(challenge => res.json(challenge))
    .catch(err => res.status(500).json(err.message));
}

function getUserChallenge(req, res) {
  UserChallenge.findOne({
    user: req.user.id,
    challenge: req.params.id,
    isOver: false,
  })
    .then((userChallenge) => {
      if (!userChallenge) {
        return res.json(null);
      }

      const { activeStage, gameId } = userChallenge;

      return res.json({ activeStage, gameId });
    })
    .catch(err => res.status(500).json(err.message));
}

function editChallenge(req, res) {
  const { challenge } = req.body;

  if (!challenge) {
    return res.sendStatus(404);
  }

  Challenge.findByIdAndUpdate(req.params.id, challenge)
    .then(challenge => res.json(challenge))
    .catch(err => res.status(500).json(err.message));
}

async function playChallenge(req, res) {
  try {
    const challenge = await Challenge.findOne({ _id: req.params.id });

    if (!challenge) {
      return res.sendStatus(404);
    }

    let userChallenge = await UserChallenge.findOne({
      user: req.user.id,
      challenge: req.params.id,
      isOver: false,
    });

    if (userChallenge && userChallenge.gameId) {
      return res.status(400).json({ error: 'You are already playing' });
    }

    if (!userChallenge) {
      userChallenge = new UserChallenge({
        user: req.user.id,
        challenge: req.params.id,
      });
    } else {
      userChallenge.activeStage += 1;
    }

    const presetId = challenge.presets[userChallenge.activeStage];
    const isPat = false;
    const { _id, width, height } = await Game.create({
      presetId,
      challengeId: req.params.id,
      userId: req.user.id,
      stage: userChallenge.activeStage,
    }, isPat);

    userChallenge.gameId = _id;

    await userChallenge.save();

    return res.json({ gameId: _id, activeStage: userChallenge.activeStage });
  } catch (err) {
    return res.status(500).json(err.message);
  }
}

function withdrawChallenge(req, res) {
  UserChallenge.remove({
    user: req.user.id,
    challenge: req.params.id,
    gameId: null,
    isOver: false,
  })
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).json(err.message));
}
