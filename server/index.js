const config = require('config');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');

app.run = () => {
  http.listen(config.port, () => {
    console.log(path.resolve('qqq', '123'));
    console.log(`[Server] Listening on ${config.port} port`);
  });
};

module.exports = app;