const controller = require("../controller/token");
const { validateToken } = require("../middlewares/validation/token");
const jwtAuthentication = require("../middlewares/jwt-authentication");

const userApi = appRouter => {
  appRouter.get(
    "/token/accountid",
    validateToken,
    jwtAuthentication,
    controller.getAccountID
  );
};

module.exports = userApi;
