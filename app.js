const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const chalk = require("chalk");
const path = require("path");
const cookieParser = require("cookie-parser");
const middlewareAuth = require("./middleware/check-auth");
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
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); //to give access to all the methods provided
    return res.status(200).json({});
  }
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
app.use(
  "/api/private",
  [middlewareAuth.checkAuth, middlewareAuth.verificationROLE_ADMIN],
  require("./routes/adminRoutes")
);
app.get(
  "/api/toto",
  [middlewareAuth.checkAuth, middlewareAuth.verificationROLE_ADMIN],
  (req, res) => {
    res.status(200).json({ message: "Le route toto" });
  }
);

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
