const mongoose = require('mongoose');
const { Schema } = mongoose;

const CatSchema = new Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model('Cat', CatSchema);