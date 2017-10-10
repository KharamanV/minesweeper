const mongoose = require('mongoose');
const Game = mongoose.model('Game');

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

module.exports = { getGame, revealSquare };
