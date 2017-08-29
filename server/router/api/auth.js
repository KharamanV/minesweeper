const config = require('config');
const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const {
  Strategy: JwtStrategy,
  ExtractJwt,
} = require('passport-jwt');

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
    user.comparePassword(password)
      .then(isMatch => isMatch ? done(null, user) : done(null, false, {message: 'Incorrect password.'}))
      .catch(err => done(err));
  });
}));

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secrets.jwt,
  issuer: 'blockminer.com',
};

passport.use(new JwtStrategy(opts, (payload, done) => (
  User.findOne({ _id: payload.sub })
    .then(user => done(null, user || false))
    .catch(done)
)));

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
          facebookId: profile.id,
          name: profile.name,
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
    callbackURL: "http://localhost:3000/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({googleId: profile.id}, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        user = new User({
          username: 'gl',
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
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login' ,
  })
);

router.post('/', (req, res) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.sendStatus(401);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({ token: jwt.sign({ sub: req.user.id }, 'secret') });
    });
  })(req, res);
});

router.get('/', (req, res) => {
  let token = req.get('Authorization').replace(/^Bearer /, '');
  if (token) {
    User.findById(jwt.verify(token, 'secret').sub)
      .then(user => {
        if (user) res.sendStatus(200);
        else res.sendStatus(401);
      });
  } else {
    res.sendStatus(401);
  }
});

router.get('/name', (req, res) => {
  let token = req.get('Authorization').replace(/^Bearer /, '');
  console.log(token);
  if (token) {
    res.json({status: 'success', username: jwt.verify(token, 'secret').sub});
  } else {
    res.sendStatus(401);
  }
});

router.post('/register', (req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    role: 'player',
    name: 'LocalName',
    _id: mongoose.Types.ObjectId(),
  });

  newUser.save((err) => {
    if (err) return console.log("didn't save user");
    return res.json({ token: jwt.sign({ sub: newUser.id }, 'secret') });
  });
});

module.exports = router;
