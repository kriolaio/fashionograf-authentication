const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const moment = require("moment");
const uuidv1 = require("uuid/v1");
const AccountModel = require("../models/account");

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
    required: true
  },
  accountID: {
    type: String
  },
  createdDate: { type: Date },
  modifiedDate: { type: Date }
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

accountSchema.loadClass(AccountModel);
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
