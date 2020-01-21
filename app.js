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
  process.exit();
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
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(logger("dev"));

// Routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/heroku/index.html"));
});
// app.use("/users", require("./routes/usersRoutes"));
// app.use("/orders", require("./routes/ordersRoutes"));

module.exports = app;
