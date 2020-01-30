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
  const ENCRYPTION_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX"; // Must be 256 bits (32 characters)
  const IV_LENGTH = 16; // For AES, this is always 16
  var hw = encrypt(word, ENCRYPTION_KEY, IV_LENGTH);
  console.log("encrypt: ", hw);
  console.log("decrypt: ", decrypt(hw, ENCRYPTION_KEY)); // outputs hello world
});

function encrypt(text, ENCRYPTION_KEY, IV_LENGTH) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text, ENCRYPTION_KEY) {
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
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
