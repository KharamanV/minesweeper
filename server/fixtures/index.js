#!/bin/env node

require('../services/mongo');

const { runFixtures } = require('../services/utils');

runFixtures([
  require('./Preset'),
  require('./Challenge'),
]).then(process.exit);
