const router = require('express').Router();
const { auth, security } = require('./auth');

router.use('/auth', auth);
router.use(security());
router.use('/games', require('./games'));
router.use('/users', require('./users'));

module.exports = router;
