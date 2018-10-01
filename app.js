const express = require("express");
const sequelize = require("./db");

const { PORT } = process.env;

const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

app.get("/signup", (req, res) => res.json({ foo: "bar" }));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
