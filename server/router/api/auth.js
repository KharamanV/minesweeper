const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

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

passport.use(new FacebookStrategy({
    clientID: "124528738191489",
    clientSecret: "c368dbf94483e868904b309480dcd3ac",
    callbackURL: "http://localhost:3000/api/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({facebookId: profile.id}, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        user = new User({
          username: 'fb',
          password: '0',
          facebookId: profile.id,
          role: 'player',
          _id: mongoose.Types.ObjectId(),
        });
        user.save((err) => {
          if (err) {
            console.log(err);
          }
          return done(null, user);
        });
      } else {
        done(null, user);
      }
    });
  }
));

passport.use(new GoogleStrategy({
    clientID: "732865366871-dp8jog2htk1bgaqte6heb986lk91mhdb.apps.googleusercontent.com",
    clientSecret: "tq5TgpcKemwtVP3upOcjOpuY",
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({googleId: profile.id}, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        user = new User({
          username: 'fb',
          password: '0',
          googleId: profile.id,
          role: 'player',
          _id: mongoose.Types.ObjectId(),
        });
        user.save((err) => {
          if (err) {
            console.log(err);
          }
          return done(null, user);
        });
      } else {
        done(null, user);
      }
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
passport.authenticate('facebook', { successRedirect: '/',
failureRedirect: '/login' }));

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
passport.authenticate('google', { successRedirect: '/',
failureRedirect: '/login' }));

router.get('/', (req, res) => {
  res.json({test: true, session: req.session});
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ status: 'error', text: 'wrong credentials' });
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({status: 'success', username: req.user.username});
    });
  })(req, res, next);
});

module.exports = router;
