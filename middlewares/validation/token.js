const validateToken = async (req, res, next) => {
  req.checkHeaders("authentication").notEmpty();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  return next();
};

module.exports = {
  validateToken
};
