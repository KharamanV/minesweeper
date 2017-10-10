const router = require('express').Router();
const challenges = require('../../controllers/challenges');

router.get('/', challenges.getChallenges);
router.get('/:id', challenges.getChallenge);
router.put('/:id', challenges.editChallenge);
router.get('/:id/user', challenges.getUserChallenge);
router.post('/:id/play', challenges.playChallenge);
router.post('/:id/withdraw', challenges.withdrawChallenge);

module.exports = router;
