const express = require("express");
const jwt = require("jsonwebtoken");
var bluebird = require("bluebird");
var crypto = bluebird.promisifyAll(require("crypto"));
var sendMail = require("../utils/mail").mailMessage;
const User = require("../models/User");
const Token = require("../models/Token");
const { encrypt, decrypt } = require('../utils/crypto');

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Account with that email address already exists."
      });
    }
    const createUser = await user.save();
    if (createUser) {
      var token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex")
      });
      await token.save();
      // Send the email
      var subject = "Account Activation";
      var text =
        "Hello,\n\n" +
        "Please verify your account by clicking the link: \nhttp://localhost:4200" +
        "/confirmation/" +
        token.token +
        "\n";
      var message =
        "A activation link email has been sent to " + user.email + ".";
      await sendMail(user.email, subject, text, message, res);
    }
  } catch (error) {
    if (error) {
      if (error.errors) {
        return res.status(400).json({
          success: false,
          message:
            "Something is wrong, maybe you forget write your email or password"
        });
      }
      console.log(error);
    }
  }
});

router.post("/login", async (req, res) => {
  const findUser = await User.findOne({ email: req.body.email });
  if (!findUser) {
    return res.json({
      success: false,
      message: `User not found!`
    });
  } else {
    // Check if password matches
    const isMatch = await findUser.comparePassword(
      req.body.password,
      findUser.password
    );
    if (isMatch && findUser.isVerified === true) {
      const token = await jwt.sign(
        {
          id: findUser._id,
          prenom: findUser.prenom,
          roles: findUser.roles,
          email: findUser.email
        },
        process.env.SECRET_KEY,
        { expiresIn: 60000 }
      ); // 300/ 60 = 5 minutes
      // res.cookie("auth", token, {
      //   expires: new Date(Date.now() + 300000)
      // });
      res.cookie("auth", token, {
        expires: new Date(Date.now() + 60000),
        secure: false,
        httpOnly: false
      });
      // var decoded = await jwt.decode(token);
      // var payload = await jwt.verify(token, process.env.SECRET_KEY);
      return res.status(200).json({
        success: true,
        token: token,
        user: {
          name: findUser.name,
          email: findUser.email,
          age: findUser.age,
          roles: findUser.roles
        },
        expiresIn: 60000,
        message: "Authentication is succesfull !"
      });
    } else {
      return res.status(401).json({
        success: false,
        message:
          "Authentication failed. Passwords did not match. or Not Activated !"
      });
    }
  }
});

module.exports = router;
