const router = require('express').Router();
const Game = require('mongoose').model('Game');

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

router.post('/', (req, res) => {
  const game = new Game();

});

module.exports = router;
