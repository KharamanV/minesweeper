const router = require('express').Router();
const presets = require('../../controllers/presets');

router.get('/', presets.getPresets);
router.get('/:id', presets.getPreset);
router.put('/:id', presets.editPreset);
router.post('/add', presets.addPreset);
router.post('/remove', presets.removePreset);
router.post('/update', presets.updatePreset);

module.exports = router;
