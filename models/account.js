const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const moment = require("moment");
const createError = require("http-errors");
const uuidv1 = require("uuid/v1");

const { Schema } = mongoose;

const accountSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  accountID: {
    type: String
  },
  createdDate: { type: Date, select: false },
  modifiedDate: { type: Date, select: false }
});

// Hooks

accountSchema.pre("save", function save(next) {
  const account = this;
  const transactionTime = moment.utc();
  if (account.isNew) {
    account.createdDate = transactionTime;
    account.accountID = uuidv1();
  }
  account.modifiedDate = transactionTime;
  if (account.isModified("password")) {
    const saltRound = 10;
    bcrypt.genSalt(saltRound, (err0, salt) => {
      if (err0) {
        return next(err0);
      }
      return bcrypt.hash(account.password, salt, (err1, hash) => {
        if (err1) {
          return next(err1);
        }
        account.password = hash;
        return next();
      });
    });
  } else {
    next();
  }
});

// Instance methods

accountSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  callback
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    return callback(null, isMatch);
  });
};

accountSchema.methods.updateEmail = function updateEmail(email) {
  if (!email) {
    throw new createError.BadRequest();
  }
  this.email = email;
};
accountSchema.methods.updatePassword = function updatePassword(password) {
  if (!password) {
    throw new createError.BadRequest();
  }
  this.password = password;
};

const AccountModel = mongoose.model("Account", accountSchema);

module.exports = AccountModel;
