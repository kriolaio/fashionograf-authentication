const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const Account = require("../models/account");

const { APP_SECRET } = process.env;

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authentication"),
  secretOrKey: APP_SECRET
};

// CreateJWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // See if the Account ID in the payload exists in our DB
  // if it does, call done with that other
  // otherwise, call done without a Account object
  try {
    const existingAccount = await Account.findOne({
      accountID: payload.account_id
    }).exec();
    if (existingAccount) {
      return done(null, existingAccount);
    }
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
});

module.exports = jwtLogin;
