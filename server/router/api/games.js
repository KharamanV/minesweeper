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
      const game = new Game({
        width,
        height,
      });

      return game.generateMines(minesCount)
        .save()
        .then(game => res.json(game));
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const {id: _id} = req.params;

  return Game.findOne({ _id })
    .then(({ size, minesCount }) => res.json({ size, minesCount }))
    .catch(({ message }) => res.status(500).json(message));

});

router.post('/:id/reveal', (req, res, next) => {
  const { x, y } = req.query;
  const {id: _id} = req.params;

  if (!x || !y) {
    return next();
  }

  return Game.findOne({ _id })
    .then(game => game.reveal(x, y))
    .then(result => res.json(result))
    .catch(({ message }) => res.status(500).json(message));
});


module.exports = router;
