const router = require('express').Router();
const mongoose = require('mongoose');
const { generate2DArray } = require('../../services/utils');
const Game = mongoose.model('Game');
const Preset = mongoose.model('Preset');

router.post('/', (req, res) => {
  const { preset } = req.body;
  const userId = req.user && req.user._id;
  //console.log(req.headers, req.user);

  if (!preset || !userId) {
    return res.sendStatus(400);
  }

  const isPat = true;

  return Preset.findOne({ _id: preset })
    .then(({ width, height, minesCount }) => {
      return new Game({ width, height, user })
        .generateMines(minesCount, isPat)
        .save()
        .then(({ _id, width, height }) => (
          res.status(201)
            .json({
              _id,
              width,
              height,
              board: generate2DArray({ width, height }),
            })
        ));
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
  const { x, y } = req.body;

  if (!x && x !== 0 || !y && y !== 0) {
    return res.sendStatus(400);
  }

  return Game.findOne({ _id: req.params.id })
    .then(game => game.revealSquare(Number(x), Number(y)))
    .then(({ status, data }) => res.status(status).json(data))
    .catch(err => res.status(500).json(err.message));
});

module.exports = router;
