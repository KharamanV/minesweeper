const router = require('express').Router();
const profile = require('../../controllers/profile');

router.get('/', profile.getUserInfo);
router.put('/update', profile.updateUserProfile);

module.exports = router;
