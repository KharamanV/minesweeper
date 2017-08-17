const config = require('config');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');

require('./services/mongo');

// Middlewares

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}

app.use(cors());
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'));

// Routes
app.use(require('./router'));

app.run = () => http.listen(config.port, () =>
  console.log(`[Server] Listening on ${config.port} port`)
);

module.exports = app;
