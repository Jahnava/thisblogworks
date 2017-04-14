const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User  = require('../models/user.model');

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  function howWeAuth(username, password, done){
    User.findOne({email: username}, function(err, user){
      if(err){
        return done(err);
      }
      if(!user){
        return done(null, false, {
          msg: "User not found"
        });
      }
      if(!user.validPassword(password)){
        return done(null, false, {
          msg: 'Authentication Failed'
        })
      }
      return done(null, user);
    });
  }));
