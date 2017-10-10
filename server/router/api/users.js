const router = require('express').Router();
const users = require('../../controllers/users');

router.get('/', users.getUsers);
router.post('/add', users.addUser);
router.post('/remove', users.removeUser);
router.put('/update', users.updateUser);

module.exports = router;
