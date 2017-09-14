#!/bin/env node

require('../services/mongo');

const fixtures = [
  require('./Preset'),
  require('./Challenge'),
];

fixtures.forEach(fixture => fixture());
