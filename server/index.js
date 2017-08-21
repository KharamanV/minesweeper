const config = require('config');
const express = require('express');
const app = express();
const session = require('express-session');
const http = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./services/mongo');

// Middlewares

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}

app.use(cors());
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'mining game',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(express.static('dist'));
// app.use(express.static('./public'));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require('./router'));

app.run = () => http.listen(config.port, () => console.log(`[Server] Listening on ${config.port} port`));

module.exports = app;
