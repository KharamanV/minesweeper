const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', (req, res) => {
  User.find({})
    .then((users) => {
      res.json({ users: users.map(user => ({
        id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
        password: user.password,
      }))
    });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/add', (req, res) => {
  const NewUser = new User(req.body);
  NewUser.save()
    .then(user => res.json({
      id: user._id,
      username: user.username,
      role: user.role,
      name: user.name,
      password: user.password,
    }))
    .catch(err => res.sendStatus(500));
});

router.post('/remove', (req, res) => {
  User.remove({ _id: req.body.id })
    .then(() => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

router.put('/update', (req, res) => {
  User.findOne({ _id: req.body.id })
    .then(user => {
      const data = req.body;
      user.username = data.username;
      user.password = data.password;
      user.name = data.name;
      user.role = data.role;
      user.save()
        .then(saved => {
          data.password = saved.password;
          res.json(saved);
        })
        .catch(err => res.sendStatus(500));
    })
    .catch(err => res.sendStatus(500));
});

module.exports = router;
