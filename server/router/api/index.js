const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/games', require('./games'));
router.use('/users', require('./users'));

module.exports = router;
