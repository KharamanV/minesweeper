process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const should = require('chai').should();
const supertest = require('supertest');
const app = require('../');
const request = supertest(app);

module.exports = {
  should,
  request,
  loadFixtures,
  clearFixtures,
};

function loadFixtures(fixtures) {
  return Promise.all(
    Object.entries(fixtures)
      .map(([model, data]) => {
        const Model = mongoose.model(model);

        return Promise.all(data.map(data => new Model(data).save()));
      })
  );
}

function clearFixtures(fixtures) {
  return Promise.all(Object.keys(fixtures).map(model => mongoose.model(model).remove()));
}
