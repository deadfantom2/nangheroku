const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const chalk = require("chalk");
const path = require("path");
require("dotenv").config();

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

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.static(__dirname + "/dist/heroku"));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(logger("dev"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/orders", require("./routes/ordersRoutes"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log("err");
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/heroku/index.html"));
});

module.exports = app;
