const router = require('express').Router();
const games = require('../../controllers/games');

// TODO: Replace _id on id
router.get('/:id', games.getGame);
router.post('/:id/reveal', games.revealSquare);

module.exports = router;
