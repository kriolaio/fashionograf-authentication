const controller = require("../controller/authentication");
const validation = require("../middlewares/validation/authentication");
const localAuthentication = require("../middlewares/local-authentication");

const authenticationApi = appRouter => {
  appRouter.post("/signup", validation.signup, controller.signup);
  appRouter.post(
    "/signin",
    validation.signin,
    localAuthentication,
    controller.signin
  );
};

module.exports = authenticationApi;
