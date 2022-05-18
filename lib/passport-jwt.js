const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {Users} = require('../models')
const jwt = require('jsonwebtoken');

const options = {
  jwtFromRequest : ExtractJwt.fromHeader('authorization'),
  secretOrKey : process.env.SECRET,
}

passport.use(new JwtStrategy(options,(payload,done)=>{
  Users.findByPk(payload.id)
  .then((response)=>{
    console.log(payload.id)
    done(null,response)
  })
  .catch((error)=>{
    done(error,false)
  })
}))
module.exports = passport