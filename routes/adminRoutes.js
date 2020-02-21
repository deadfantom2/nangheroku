const express = require("express");

// Init app
const app = express();

// Models
const User = require("../models/User");
const Token = require("../models/Token");

// Patch for change user Role's, except your's role
app.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const findUser = await User.findById({ _id: id });
    findUser.roles === "ADMIN_ROLE"
      ? (findUser.roles = "USER_ROLEs")
      : (findUser.roles = "ADMIN_ROLE");

    await findUser.save();
    res.status(200).json({
      message: "Role changed for user: " + findUser.name,
      user: findUser
    });
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).send({ message: "Error" });
    }
  }
});

module.exports = app;
