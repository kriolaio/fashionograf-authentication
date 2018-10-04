const mongoose = require("mongoose");

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DB,
  MONGO_URL,
  MONGO_PORT
} = process.env;

const connectionStr = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}:${MONGO_PORT}/${MONGO_DB}`;
const connectionOpt = { useNewUrlParser: true, useCreateIndex: true };
mongoose.connect(
  connectionStr,
  connectionOpt
);
mongoose.Promise = global.Promise;

mongoose.connection.on("error", err => {
  console.log("Could not connect to mongo server!");
  console.log(err);
});
mongoose.connection.once("open", () => {
  console.log("Connected to mongo server.");
});

module.exports = mongoose;
