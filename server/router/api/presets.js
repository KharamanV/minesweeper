const router = require('express').Router();
const mongoose = require('mongoose');
const Preset = mongoose.model('Preset');
const Challenge = mongoose.model('Challenge');

router.get('/', (req, res) => {
  const { challenge } = req.query;
  let presetQuery = null;

  if (challenge) {
    return Challenge.findById(challenge)
      .select('presets')
      .populate('presets')
      .then(({ presets }) => res.json(presets))
      .catch(err => res.status(500).json(err.message))
  }

  return Preset.find()
    .then(presets => res.json(presets))
    .catch(err => res.status(500).json(err.message));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(404);
  }

  Preset.findById(id)
    .select('+patChance')
    .then(preset => res.json(preset))
    .catch(err => res.status(500).json(err.message))
});

router.put('/:id', editPreset);

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

function editPreset(req, res) {
  const { preset } = req.body;

  if (!preset) {
    return res.sendStatus(404);
  }

  Preset.findByIdAndUpdate(req.params.id, preset)
    .then(preset => res.json(preset))
    .catch(err => res.status(500).json(err.message));
}