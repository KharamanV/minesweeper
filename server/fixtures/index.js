#!/bin/env node

require('../services/mongo');

const fixtures = [
  require('./Preset'),
];

fixtures.forEach(fixture => fixture());
