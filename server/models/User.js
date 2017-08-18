const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});
UserSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

module.exports = mongoose.model('User', UserSchema);
