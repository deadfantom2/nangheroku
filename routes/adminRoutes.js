const express = require("express");
const middlewareAuth = require("../middleware/check-auth");
// Init app
const app = express();

// Models
const User = require("../models/User");

// Patch for change user (Role's and Activation access)  except your's role
app.patch(
  "/:type/:id",
  middlewareAuth.cantChangeYourAdminAccess,
  async (req, res) => {
    try {
      const type = req.params.type;
      const id = req.params.id;
      const findUser = await User.findById({ _id: id });
      await adminFunction(type, findUser, req, res);
    } catch (error) {
      if (error) {
        console.log(error);
        res.status(400).send({ message: "Error" });
      }
    }
  }
);

async function adminFunction(type, user, req, res) {
  if (type === "roles") {
    user.roles = req.body.roles;
  }
  if (type === "activations") {
    user.isVerified === true
      ? (user.isVerified = false)
      : (user.isVerified = true);
  }
  await user.save();
  res.status(200).json({
    message: "Role changed for user: " + user.name,
    user: user
  });
}

module.exports = app;
