const mongoose = require('mongoose');
const crypto  = require('crypto');
const jwt = require('jsonwebtoken');
const signature = process.env.SIGNATURE || require('../secrets').SIGNATURE;


const userSchema = mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  hash: {
    type: String
  }
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64)
                    .toString('hex');
}
userSchema.methods.validPassword = function(password){
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64)
                     .toString('hex');
  return this.hash === hash; //if they equal, ye shall pass, otherwise, get out
}
userSchema.methods.generateJwt = function(){
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 7); // create a date that is 7 days in the future
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiration.getTime() / 1000)
  }, signature);
}


var User = mongoose.model('User', userSchema);
module.exports = User;
