const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', (req, res) => {
  User.find({}).select('username role')
  .then(users => {
    res.json({ users: users.map(user => ({ id: user._id, username: user.username, role: user.role, })) });
  })
  .catch(err => res.status(500).json(err));
});

router.post('/add', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  })
  .then(user => {
    res.json({ user });
  })
  .catch(err => res.json({status: 'error', text: 'Could not add user!'}));
});

router.post('/remove', (req, res) => {
  User.remove({ _id: req.body.id })
  .then(() => res.json({status: 'success'}))
  .catch(err => res.json({status: 'error', text: 'Could not add user!'}));
});

router.post('/update', (req, res) => {
  User.updateOne({ _id: req.body.id }, { $set: req.body })
  .then(user => res.json({status: "success"}))
  .catch(err => res.json({status: "error", text: err}));
});

module.exports = router;
