const jwt = require("jwt-simple");
const moment = require("moment");

const Account = require("../schemas/account");

const { APP_SECRET } = process.env;

const tokenForAccount = account => {
  const payload = {
    account_id: account.accountID,
    iat: moment().unix(),
    exp: moment()
      .add(10, "days")
      .unix()
  };
  return jwt.encode(payload, APP_SECRET);
};

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // See if a account with the given email exists
    const existingAccount = await Account.findOne({
      email: email.toLowerCase()
    }).exec();
    // If a account with email does exits, return an error
    if (existingAccount) {
      return res.status(422).send({
        error: "Email is in use"
      });
    }
    const newAccount = await Account.create({
      email,
      password
    });
    return res.json({
      token: tokenForAccount(newAccount)
    });
  } catch (err) {
    return next(err);
  }
};

const signin = (req, res, next) => {
  // Account has already had their email and password auth'd
  // we just need to give them a token
  try {
    return res.json({
      token: tokenForAccount(req.user)
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signup,
  signin
};
