const router = require('express').Router();

router.use('/games', require('./games'));

router.use('/auth', require('./auth'));

module.exports = router;
