const expres = require("express");
const app = expres.Router();

app.get("/register", async (req, res, next) => {
  console.log("register");
  res.send("register");
});

app.get("/login", async (req, res, next) => {
  console.log("login");
  res.send("login");
});

module.exports = app;
