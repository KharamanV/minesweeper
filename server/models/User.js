const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});
