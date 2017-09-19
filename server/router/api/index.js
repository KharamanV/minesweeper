const router = require('express').Router();
const { auth, security } = require('./auth');

router.use('/auth', auth);
router.use(security());
router.use('/challenges', require('./challenges'));
router.use('/games', require('./games'));
router.use('/presets', require('./presets'));
router.use('/stats', require('./statistic'));
router.use('/users', require('./users'));
router.use('/profile', require('./profile'));

module.exports = router;
