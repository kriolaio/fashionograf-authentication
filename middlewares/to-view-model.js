const accountToAccountVM = (req, res, next) => {
  req.accountVM = req.user.toVM();
  next();
};

module.exports = {
  accountToAccountVM
};
