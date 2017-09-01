const router = require('express').Router();
const mongoose = require('mongoose');
const { generate2DArray } = require('../../services/utils');
const Game = mongoose.model('Game');
const User = mongoose.model('User');
const Preset = mongoose.model('Preset');

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
  Preset.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  })
  .then((user) => {
    res.json({ user });
  })
  .catch(err => res.json({status: 'error', text: 'Could not add user!'}));
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

router.post('/', async (req, res) => {
  try {
    const { preset } = req.body;

    if (!preset) {
      return res.sendStatus(400);
    }

    const isPat = true;
    const { width, height, minesCount } = await Preset.findOne({ _id: preset });
    const game = new Game({ width, height });
    const { _id } = await game.generateMines(minesCount, isPat).save();
    const user = await User.findById(req.user._id);

    user.game = _id;

    await user.save();

    res.status(201)
      .json({
        _id,
        width,
        height,
        board: generate2DArray({ width, height }),
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  const { id: _id } = req.params;

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
