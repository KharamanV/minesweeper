const router = require('express').Router();
const mongoose = require('mongoose');
const { generate2DArray } = require('../../services/utils');
const Game = mongoose.model('Game');
const User = mongoose.model('User');
const Preset = mongoose.model('Preset');

// TODO: Replace _id on id
router.get('/presets', (req, res) => {
  Preset.find()
    .then(presets => res.json(presets.map(preset => ({
      id: preset._id,
      name: preset.name,
      width: preset.width,
      height: preset.height,
      minesCount: preset.minesCount,
      rewardMultiplier: preset.rewardMultiplier,
    }))))
    .catch(err => res.status(500).json({ err }));
});

router.post('/presets/add', (req, res) => {
  Preset.create(req.body)
  .then((preset) => {
    res.json({
      id: preset._id,
      name: preset.name,
      width: preset.width,
      height: preset.height,
      minesCount: preset.minesCount,
      rewardMultiplier: preset.rewardMultiplier,
    });
  })
  .catch(err => res.sendStatus(500));
});

router.post('/presets/remove', (req, res) => {
  Preset.remove({ _id: req.body.id })
  .then(() => res.sendStatus(200))
  .catch(err => res.sendStatus(500));
});

router.post('/presets/update', (req, res) => {
  Preset.updateOne({ _id: req.body.id }, { $set: req.body })
  .then(preset => res.sendStatus(200))
  .catch(err => res.sendStatus(500));
});

router.get('/:id', getGame);
router.post('/:id/reveal', revealSquare);

module.exports = router;

function getGame(req, res) {
  const { id: _id } = req.params;

  return Game.findOne({ _id })
    .then(({ width, height, visitedSquares }) => res.json({
      width,
      height,
      visitedSquares,
    }))
    .catch(err => res.status(500).json(err.message));
}

function revealSquare(req, res) {
  const { x, y } = req.body;

  if (!x && x !== 0 || !y && y !== 0) {
    return res.sendStatus(400);
  }

  return Game.findOne({ _id: req.params.id })
    .then(game => game.revealSquare(Number(x), Number(y)))
    .then(({ status, data }) => res.status(status).json(data))
    .catch(err => console.error(err) || res.status(500).json(err.message));
}