const express = require("express");
const jwt = require("jsonwebtoken");
const bluebird = require("bluebird");
const crypto = bluebird.promisifyAll(require("crypto"));
const bcrypt = require("bcrypt");
const sendMail = require("../utils/mail").mailMessage;
const mail_messages = require("../config/mail-messages");
const User = require("../models/User");
const Token = require("../models/Token");
const lifeToken = require("../config/variables");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Account with that email address already exists.",
      });
    }
    const createUser = await user.save();
    if (createUser) {
      const tokenHex = crypto.randomBytes(16).toString("hex");
      const token = new Token({
        _userId: user._id,
        token: tokenHex,
      });
      await token.save();
      // res.status(201).json({ success: true, message: message });
      await sendMail(
        user.email,
        mail_messages.subjectLink,
        mail_messages.mail_text("register", tokenHex),
        mail_messages.messageLink,
        res
      );
    }
  } catch (error) {
    console.log("error: ", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: `User not found!`,
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
            _id: findUser.id,
            name: findUser.name,
            roles: findUser.roles,
          },
          process.env.SECRET_KEY,
          { expiresIn: lifeToken.lifeOfJWTToken }
        );
        return res.status(200).json({
          success: true,
          token: token,
          expiresIn: lifeToken.lifeOfJWTToken,
          message: "Authentication is succesfull !",
        });
      } else {
        return res.status(401).json({
          success: false,
          message:
            "Authentication failed. Passwords did not match. or Not Activated !",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/confirmation/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const tokenExist = await Token.findOne({ token: token });

    if (!tokenExist) {
      res.status(400).json({ success: false, message: "Bad action link!" });
    } else {
      const userExist = await User.findById({ _id: tokenExist._userId });
      if (!userExist) {
        res.status(400).json({
          success: false,
          message: "User doesn't exist, create your account!",
        });
      }
      if (userExist.isVerified) {
        res
          .status(400)
          .json({ success: false, message: "Account already activated!" });
      } else {
        userExist.isVerified = true;
        const accountActivation = await userExist.save();
        res.status(200).json({
          success: true,
          message:
            "Account " + accountActivation.email + " has been activated!",
        });
      }
    }
  } catch (error) {
    console.log("error: ", error);
  }
});

router.post("/resend", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "User account is activated!" });
    } else {
      const tokenHex = crypto.randomBytes(16).toString("hex");
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: `User doesn't exist!` });
      }
      await Token.updateOne(
        { _userId: user._id },
        {
          $set: {
            _userId: user._id,
            token: tokenHex,
          },
        }
      );
      await sendMail(
        user.email,
        mail_messages.subjectLink,
        mail_messages.mail_text("register", tokenHex),
        mail_messages.messageLink,
        res
      );
    }
  } catch (error) {
    console.log("error: ", error);
  }
});

router.post("/forgot", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: `Account doesn't exist!`,
      });
    } else {
      const tokenHex = crypto.randomBytes(16).toString("hex");
      const passwordResetExpires = Date.now() + 3600000;
      await User.updateOne(
        { email: req.body.email },
        {
          $set: {
            passwordResetToken: tokenHex,
            passwordResetExpires: passwordResetExpires,
          },
        }
      );
      await sendMail(
        user.email,
        mail_messages.subjectForgot,
        mail_messages.mail_text("forgot", tokenHex),
        mail_messages.messageForgot,
        res
      );
    }
  } catch (error) {
    console.log("error: ", error);
  }
});

router.get("/reset/:token", async (req, res, next) => {
  try {
    const token = req.params.token;
    const userExpirationToken = await User.findOne({
      passwordResetToken: token,
    })
      .where("passwordResetExpires")
      .gt(new Date().toISOString());
    if (!userExpirationToken) {
      res.status(400).json({
        success: false,
        message: "Password reset token is invalid or has expired.",
      });
    } else {
      res.status(200).json({ success: true, message: "Good reset link" });
    }
  } catch (error) {
    console.log("error: ", error);
  }
});

router.patch("/reset/:token", async (req, res, next) => {
  const token = req.params.token;
  const user = await User.findOne({ passwordResetToken: token })
    .where("passwordResetExpires")
    .gt(Date.now());
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Password link is wrong or has expired!",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await User.updateOne(
      { passwordResetToken: token },
      {
        $set: {
          password: hashPassword,
          passwordResetToken: undefined,
          passwordResetExpires: undefined,
        },
      }
    );
    await sendMail(
      user.email,
      mail_messages.subjectForgot,
      mail_messages.mail_text("reset", user.email),
      mail_messages.messageReset,
      res
    );
  }
});

module.exports = router;
