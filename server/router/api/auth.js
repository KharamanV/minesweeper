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

passport.use(new LocalStrategy((username, password, done) => (
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      return user.comparePassword(password)
        .then(isMatch => isMatch ? done(null, user) : done(null, false, { message: 'Incorrect password.' }))
    })
    .catch(done)
)));

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secrets.jwt,
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
    User.findOne({facebookId: profile.id})
      .then(user => {
        if (!user) {
          user = new User({
            facebookId: profile.id,
            name: profile.displayName,
            role: 'player',
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
      })
      .catch(err => done(err));
  }
));

passport.use(new GoogleStrategy({
    clientID: "732865366871-dp8jog2htk1bgaqte6heb986lk91mhdb.apps.googleusercontent.com",
    clientSecret: "tq5TgpcKemwtVP3upOcjOpuY",
    callbackURL: "http://localhost:3000/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({googleId: profile.id})
      .then(user => {
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            role: 'player',
          });
          user.save((err) => {
            if (err) {
              console.log(err);
            }
            done(null, user);
          });
        } else {
          done(null, user);
        }
      })
      .catch(err => done(err));
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

router.post('/', passport.authenticate('local'), (req, res) => {
  return res.json({ token: jwt.sign({ sub: req.user.id }, config.secrets.jwt) });
});

router.get('/facebook', passport.authenticate('facebook'));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook'),
  (req, res) => {
    const token = jwt.sign({ sub: req.user.id }, config.secrets.jwt);
    return res.redirect(`/?token=${token}`);
  }
);

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get(
  '/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    const token = jwt.sign({ sub: req.user.id }, config.secrets.jwt);
    return res.redirect(`/?token=${token}`);
  }
);

router.get('/', passport.authenticate('jwt'), (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      if (user) res.sendStatus(200);
      else res.sendStatus(401);
    })
    .catch(err => console.log(err));
});

router.get('/name', passport.authenticate('jwt'), (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      if (user) res.json({ name: user.name });
      else res.sendStatus(401);
    })
    .catch(err => console.log(err));
});

router.post('/register', (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        let newUser = new User({
          username: req.body.username,
          password: req.body.password,
          role: 'player',
          name: 'LocalName',
          _id: mongoose.Types.ObjectId(),
        });

        newUser.save((err) => {
          if (err) return console.log("didn't save user");
          return res.json({ token: jwt.sign({ sub: newUser.id }, config.secrets.jwt) });
        });
      } else {
        res.sendStatus(409);
      }
    })
    .catch(err => console.log(err))
});

module.exports = {
  auth: router,
  security: () => passport.authenticate('jwt', { session: false }),
};
