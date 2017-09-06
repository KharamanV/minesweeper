const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlanSchema = new Schema({

});

module.exports = mongoose.model('Plan', PlanSchema);
