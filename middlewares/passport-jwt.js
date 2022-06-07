const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { Players } = require('../models');


const options = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : process.env.SECRET,
}

passport.use(new JwtStrategy(options,(payload,done)=>{
  Players.findByPk(payload.id)
  .then((response)=>{
    console.log(payload.id)
    done(null,response)
  })
  .catch((error)=>{
    done(error,false)
  })
}))
module.exports = passport