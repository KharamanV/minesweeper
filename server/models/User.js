const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  facebookId: {type: String, required: false},
  googleId: {type: String, required: false},
});
UserSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

module.exports = mongoose.model('User', UserSchema);
