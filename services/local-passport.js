const LocalStrategy = require("passport-local");
const User = require("../models/user");

const localOptions = {
  usernameField: "email",
  passReqToCallback: true
};

const localLogin = new LocalStrategy(
  localOptions,
  async (req, email, password, done) => {
    // Vefify this email and password, call done with the user
    // if it is the correct email and password
    // otherwise , call done with false
    try {
      const existingUser = await User.findOne({
        email
      }).exec();
      if (existingUser) {
        // Return done(null, existingUser);
        existingUser.comparePassword(password, async (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (!isMatch) {
            return done(null, false);
          }
          return done(null, existingUser);
        });
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }
);

module.exports = localLogin;
