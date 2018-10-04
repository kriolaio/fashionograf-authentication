const authenticationApi = require("./authentication-api");
const tokenApi = require("./token-api");

module.exports = appRouter => {
  authenticationApi(appRouter);
  tokenApi(appRouter);
};
