const signup = async (req, res, next) => {
  req
    .checkBody("email")
    .notEmpty()
    .isEmail();
  req
    .checkBody("password")
    .notEmpty()
    .isValidPassword();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  req
    .sanitizeBody("email")
    .trim()
    .toLowerCase();
  req.sanitizeBody("password").trim();
  return next();
};

const signin = async (req, res, next) => {
  req
    .checkBody("email")
    .notEmpty()
    .isEmail();
  req
    .checkBody("password")
    .notEmpty()
    .isValidPassword();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  req
    .sanitizeBody("email")
    .trim()
    .toLowerCase();
  req.sanitizeBody("password").trim();
  return next();
};

module.exports = {
  signup,
  signin
};
