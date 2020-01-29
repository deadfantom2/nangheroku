const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const chalk = require("chalk");
const path = require("path");
const cookieParser = require("cookie-parser");
const checkAuth = require("./middleware/check-auth");
require("dotenv").config();
// const { encrypt, decrypt } = require("./utils/crypto");
const crypto = require("crypto");

// Init express
const app = express();

// Connect to MongoDB.
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("open", () => {
  console.log("%s MongoDB is running.", chalk.green("✗"));
});
mongoose.connection.on("error", err => {
  console.error(err);
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});
mongoose.set("useCreateIndex", true);

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(__dirname + "/dist/heroku"));
app.disable("x-powered-by");
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.static(__dirname + "/"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/orders", require("./routes/ordersRoutes"));
app.get("/api/toto", checkAuth, (req, res) => {
  res.status(200).json({ message: "Le route toto" });
});

app.get("/crypto", (req, res) => {
  // do not use a global iv for production,
  // generate a new one for each encryption
  var word =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzBiZjE0YmQ4OTNmMmE5Y2Q1Y2I5MSIsInJvbGVzIjoiVVNFUl9ST0xFIiwiZW1haWwiOiJjYW1lcmF0ZXN0ODExQGdtYWlsLmNvbSIsImlhdCI6MTU4MDMzNjc1MCwiZXhwIjoxNTgwMzk2NzUwfQ.2bbqkoX7qhyX7lyLjBtlGPe08-oHGjO83nNIPxAzHv8";
  var algorithm = "aes-256-ct";
  var password = "3zTvzr3p67VC61jmV54rIYu1545x4TlY";
  var hw = encrypt(word, algorithm, password);
  console.log("encrypt: ", hw);
  console.log("decrypt: ", decrypt(hw, algorithm, password)); // outputs hello world
});

function encrypt(text, algorithm, password) {
  console.log("enter in encrypt: ", crypto.createCipheriv(algorithm, password));
  var cipher = crypto.createCipheriv(algorithm, password);
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

function decrypt(text, algorithm, password) {
  var decipher = crypto.createDecipheriv(algorithm, password);
  var dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/heroku/index.html"));
});

module.exports = app;
