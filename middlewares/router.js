const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

const jwtLogin = require("../services/jwt-passport");
const localLogin = require("../services/local-passport");

const customValidators = require("../libs/custom-express-validator");

const apiBinder = require("../apis");

const appRouter = express.Router();
appRouter.use(
  bodyParser.urlencoded({
    extended: true
  })
);
appRouter.use(
  expressValidator({
    customValidators
  })
);

appRouter.use(bodyParser.json());

passport.use(jwtLogin);
passport.use(localLogin);

// BIND ALL API CONTROLLERS
apiBinder(appRouter);

module.exports = appRouter;
