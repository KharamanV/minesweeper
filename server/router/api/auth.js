const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({
    username: username
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {message: 'Incorrect username.'});
    }
    if (!user.validPassword(password)) {
      return done(null, false, {message: 'Incorrect password.'});
    }
    return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


router.post("/", function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(JSON.stringify({status: 'error', text: 'wrong credentials'}));;
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.send(JSON.stringify({status: 'success', username: req.user.username}));
    });
  })(req, res, next);
});

module.exports = router;
