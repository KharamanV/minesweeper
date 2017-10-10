const mongoose = require('mongoose');
const Preset = mongoose.model('Preset');
const Challenge = mongoose.model('Challenge');

function getPresets(req, res) {
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
};

function getPreset(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(404);
  }

  Preset.findById(id)
    .select('+patChance')
    .then(preset => res.json(preset))
    .catch(err => res.status(500).json(err.message))
};

function addPreset(req, res) {
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
};

function removePreset(req, res) {
  Preset.remove({ _id: req.body.id })
    .then(() => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
};

function updatePreset(req, res) {
  Preset.updateOne({ _id: req.body.id }, { $set: req.body })
    .then(preset => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
};

function editPreset(req, res) {
  const { preset } = req.body;

  if (!preset) {
    return res.sendStatus(404);
  }

  Preset.findByIdAndUpdate(req.params.id, preset)
    .then(preset => res.json(preset))
    .catch(err => res.status(500).json(err.message));
}

module.exports = {
  getPresets,
  getPreset,
  addPreset,
  removePreset,
  updatePreset,
  editPreset,
};
