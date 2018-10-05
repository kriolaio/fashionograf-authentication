const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

const { APP_SECRET } = process.env;

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authentication"),
  secretOrKey: APP_SECRET
};

// CreateJWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // See if the user ID in the payload exists in our DB
  // if it does, call done with that other
  // otherwise, call done without a user object
  try {
    const existingUser = await User.findOne({
      accountID: payload.account_id
    }).exec();
    if (existingUser) {
      return done(null, existingUser);
    }
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
});

module.exports = jwtLogin;
