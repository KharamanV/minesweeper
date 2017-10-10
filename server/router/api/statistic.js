const router = require('express').Router();
const statistic = require('../../controllers/statistic');

router.get('/', statistic.getStats);
router.get('/challenges', statistic.getChallengesStats);
router.get('/challenges/:id', statistic.getStagesStats);
router.get('/:id', statistic.getStatsById);

module.exports = router;
