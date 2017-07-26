const config = require('config');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

// Register models
require('../models');

// Connect to MongoDB
mongoose.connection
  .on('error', err => console.error('[MongoDB] connection error:', err) || process.exit(-1))
  .on('open', () => console.info('[MongoDB] connected'));

mongoose.connect(config.mongo, { useMongoClient: true });

module.exports = mongoose;
