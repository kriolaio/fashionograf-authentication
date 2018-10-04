const express = require("express");
const mongoose = require("./db");
const router = require("./middlewares/router");

const { PORT, APP_ROOT } = process.env;

const app = express();

app.use(APP_ROOT, router);

const server = app.listen(PORT, () =>
  console.log(`Authentication app is listening on port ${PORT}!`)
);

const shutDown = () => {
  console.log("server closing");
  server.close(() => {
    console.log("server closed.");
    // boolean means [force], see in mongoose doc
    console.log("db connection closing.");
    mongoose.connection.close(false, () => {
      console.log("db connection closed.");
      process.exit(0);
    });
  });
};

process.on("SIGTERM", () => {
  shutDown();
});
process.on("SIGINT", () => {
  shutDown();
});
