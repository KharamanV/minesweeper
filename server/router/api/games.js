const router = require('express').Router();
const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const Preset = mongoose.model('Preset');

router.post('/', (req, res) => {
  const { preset } = req.query;

  if (!preset) {
    return res.sendStatus(400);
  }

  return Preset.findOne({ _id: preset })
    .then(({ width, height, minesCount }) => {
      return new Game({ width, height })
        .generateMines(minesCount)
        .save()
        .then(game => res.json(game));
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const {id: _id} = req.params;

  return Game.findOne({ _id })
    .then(({ width, height, mines }) => res.json({
      width,
      height,
      minesCount: mines.length,
    }))
    .catch(err => res.status(500).json(err.message));
});

router.post('/:id/reveal', (req, res) => {
  const { x, y } = req.query;

  if (!x || !y) {
    return res.status(400).json('Missing arguments');
  }

  return Game.findOne({ _id: req.params.id })
    .then(game => game.revealSquare(x, y))
    .then(({ status, data }) => res.status(status).json(data))
    .catch(err => res.status(500).json(err.message));
});


module.exports = router;
