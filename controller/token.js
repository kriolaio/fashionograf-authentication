const getAccountID = (req, res, next) => {
  // User has already had their email and password auth'd
  // we just need to give them a token
  const accountID = (req.user && req.user.accountID) || null;
  try {
    return res.json({
      accountID
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAccountID
};
