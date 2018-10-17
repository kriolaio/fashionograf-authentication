const { validateToken } = require("../middlewares/validation/token");
const jwtAuthentication = require("../middlewares/jwt-authentication");
const { accountToAccountVM } = require("../middlewares/to-view-model");

const tokenApi = appRouter => {
  appRouter.get(
    "/token/account",
    validateToken,
    jwtAuthentication,
    accountToAccountVM,
    (req, res) =>
      res.json({
        account: req.accountVM
      })
  );
};

module.exports = tokenApi;
