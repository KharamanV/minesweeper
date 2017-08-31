const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', getUserInfo);
router.put('/update', updateUserProfile);

function getUserInfo(req, res) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(400).end();
      }

      const { _id, name, username, role } = user;

      return res
        .status(202)
        .json({
          _id,
          name,
          username,
          role,
        })
        .end();
    })
    .catch(() => res.status(500).end());
}

function updateUserProfile(req, res) {
  if (Object.keys(req.body).length <= 0) {
    return res.status(400).end();
  }

  User.findById(req.user._id)
    .then((user) => {
      const updatedUser = Object.assign(user, req.body);

      updatedUser.save((err) => {
        if (err) res.status(500).end();

        return res
          .status(202)
          .json(updatedUser)
          .end();
      });
    })
}

module.exports = router;
