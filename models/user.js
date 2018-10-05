const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const moment = require("moment");
const createError = require("http-errors");
const uuidv1 = require("uuid/v1");

const { Schema } = mongoose;

const userSchema = new Schema({
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
  createdDate: Date,
  modifiedDate: Date
});

// Hooks

userSchema.pre("save", function save(next) {
  const user = this;
  const transactionTime = moment.utc();
  if (user.isNew) {
    user.createdDate = transactionTime;
    user.accountID = uuidv1();
  }
  user.modifiedDate = transactionTime;
  if (user.isModified("password")) {
    const saltRound = 10;
    bcrypt.genSalt(saltRound, (err0, salt) => {
      if (err0) {
        return next(err0);
      }
      return bcrypt.hash(user.password, salt, (err1, hash) => {
        if (err1) {
          return next(err1);
        }
        user.password = hash;
        return next();
      });
    });
  } else {
    next();
  }
});

// Instance methods

userSchema.methods.comparePassword = function comparePassword(
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

userSchema.methods.updateEmail = function updateEmail(email) {
  if (!email) {
    throw new createError.BadRequest();
  }
  this.email = email;
};
userSchema.methods.updatePassword = function updatePassword(password) {
  if (!password) {
    throw new createError.BadRequest();
  }
  this.password = password;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
