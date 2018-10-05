const isValidPassword = value =>
  new Promise((resolve, reject) => {
    if (value.length < 6) {
      reject(new Error("value should be at least 6 characters"));
    }
    resolve();
  });

module.exports = {
  isValidPassword
};
