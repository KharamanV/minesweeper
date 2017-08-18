const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    console.log(users);
    res.send({users: users.map(user => ({username: user.username, role: user.role, id: user._id}))});
  });
});

module.exports = router;
