// const LocalStrategy = require('passport-local').Strategy;
const config = require('config');
const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
  Strategy: JwtStrategy,
  ExtractJwt,
} = require('passport-jwt');

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

// passport.use(new LocalStrategy(function(username, password, done) {
//   User.findOne({
//     username: username
//   }, function(err, user) {
//     if (err) {
//       return done(err);
//     }
//     if (!user) {
//       return done(null, false, {message: 'Incorrect username.'});
//     }
//     if (!user.validPassword(password)) {
//       return done(null, false, {message: 'Incorrect password.'});
//     }
//     return done(null, user);
//   });
// }));

passport.use(new FacebookStrategy({
    clientID: '124528738191489',
    clientSecret: 'c368dbf94483e868904b309480dcd3ac',
    callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
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
router.get('/facebook/callback',passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     console.log("redirect here");
//     res.redirect('/');
//   });

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

router.post('/', (req, res, next) => {
  passport.authenticate('jwt', function(err, user, info) {
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

router.post('/register', (req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    role: 'player',
    jwt: jwt.sign({ sub: req.body.username }, 'secret'),
  });
  newUser.save((err) => {
    if (err) return console.log("didn't save user");
    console.log("Saved");
  });
});

module.exports = router;
