const { validateToken } = require("../middlewares/validation/token");
const jwtAuthentication = require("../middlewares/jwt-authentication");

const tokenApi = appRouter => {
  appRouter.get(
    "/token/account",
    validateToken,
    jwtAuthentication,
    (req, res) =>
      res.json({
        account: req.user
      })
  );
};

module.exports = tokenApi;
