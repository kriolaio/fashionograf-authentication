const validateToken = async (req, res, next) => {
  req.checkHeaders("authentication").notEmpty();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(200).json({
      accountID: null
    });
  }
  return next();
};

module.exports = {
  validateToken
};
