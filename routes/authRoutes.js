const express = require("express");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/register", (req, res, next) => {
  // bcrypt.hash(req.body.password, 10).then(function(hash) {
  const user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user
    .save()
    .then(function(result) {
      res.status(201).json({ message: "User created!", result: result });
    })
    .catch(function(err) {
      res.status(500).json({ error: err });
    });
  // });
});

router.post("/login", function(req, res, next) {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(function(user) {
      if (!user) {
        return res.status(401).json({ message: "Auth failed" });
      }
      fetchedUser = user;
      return fetchedUser;
    })
    .then(function(result) {
      if (!result) {
        return res.status(401).json({ message: "Auth failed" });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ token: token, expiresIn: 3600, userId: fetchedUser._id });
    })
    .catch(function(err) {
      return res.status(401).json({ message: "Auth failed" });
    });
});

module.exports = router;
