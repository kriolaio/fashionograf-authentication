const LocalStrategy = require("passport-local");
const Account = require("../schemas/account");

const localOptions = {
  usernameField: "email",
  passReqToCallback: true
};

const localLogin = new LocalStrategy(
  localOptions,
  async (req, email, password, done) => {
    // Vefify this email and password, call done with the Account
    // if it is the correct email and password
    // otherwise , call done with false
    try {
      const existingAccount = await Account.findOne({
        email
      }).exec();
      if (existingAccount) {
        // Return done(null, existingAccount);
        existingAccount.comparePassword(password, async (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (!isMatch) {
            return done(null, false);
          }
          return done(null, existingAccount);
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
