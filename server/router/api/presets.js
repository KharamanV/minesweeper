const router = require('express').Router();
const mongoose = require('mongoose');
const Preset = mongoose.model('Preset');

router.get('/', (req, res) => {
  Preset.find()
    .then(presets => res.json(presets))
    .catch(err => res.status(500).json({ err }));
});

router.post('/add', (req, res) => {
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

router.post('/remove', (req, res) => {
  Preset.remove({ _id: req.body.id })
    .then(() => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});
router.post('/update', (req, res) => {
  Preset.updateOne({ _id: req.body.id }, { $set: req.body })
    .then(preset => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

module.exports = router;