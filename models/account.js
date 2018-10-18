const bcrypt = require("bcrypt");
const createError = require("http-errors");
const _ = require("underscore");

class Account {
  comparePassword(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return callback(err);
      }
      return callback(null, isMatch);
    });
  }

  updateEmail(email) {
    if (!email) {
      throw new createError.BadRequest();
    }
    this.email = email;
  }

  updatePassword(password) {
    if (!password) {
      throw new createError.BadRequest();
    }
    this.password = password;
  }

  toVM(acceptedProperties = {}) {
    const jsonObj = this.toJSON();
    const defaultAcceptedProperties = {
      accountID: true,
      email: true,
      password: false,
      createdDate: false,
      modifiedDate: false,
      _id: false,
      __v: false
    };

    Object.assign(defaultAcceptedProperties, acceptedProperties);
    const ommitedProperties = Object.keys(defaultAcceptedProperties).filter(
      key => !defaultAcceptedProperties[key]
    );
    return _.omit(jsonObj, ommitedProperties);
  }
}

module.exports = Account;
