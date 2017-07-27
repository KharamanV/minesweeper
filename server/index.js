const config = require('config');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');

require('./services/mongo');

/*const Game = require('mongoose').model('Game');

const game = new Game();
game.size = 3;
game.minesCount = 9;
game.board = [5979ea24c2723f6a56023867
  [
    {
      isMine: false, isRevealed: false, isEmpty: false, isFlagged: false, adjacentMinesCount: 1,
    },
    {
      isMine: true, isRevealed: false, isEmpty: false, isFlagged: false, adjacentMinesCount: null,
    },
    {
      isMine: false, isRevealed: false, isEmpty: false, isFlagged: false, adjacentMinesCount: 1,
    },
  ],
  [
    {
      isMine: false, isRevealed: false, isEmpty: false, isFlagged: false, adjacentMinesCount: 2,
    },
    {
      isMine: false, isRevealed: false, isEmpty: false, isFlagged: false, adjacentMinesCount: 3,
    },
    {
      isMine: false, isRevealed: false, isEmpty: false, isFlagged: false, adjacentMinesCount: 2,
    },
  ],
  [
    {
      isMine: true, isRevealed: false, isEmpty: false, isFlagged: false, adjacentMinesCount: null,
    },
    {
      isMine: false, isRevealed: false, isEmpty: false, isFlagged: false, adjacentMinesCount: 2,
    },
    {
      isMine: true, isRevealed: false, isEmpty: false, isFlagged: false, adjacentMinesCount: null,
    },
  ],
];
game.save().then(console.log, console.error);*/

// Middlewares
app.use(cors());
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(require('./router'));

app.run = () => http.listen(config.port, () =>
  console.log(`[Server] Listening on ${config.port} port`)
);

module.exports = app;
