const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var validate = require("mongoose-validator");

// Name Validator
var nameValidator = [
  validate({
    validator: "matches",
    arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
    message:
      "Name must be at least 3 characters, max 30, no special characters or numbers, must have space in between name."
  }),
  validate({
    validator: "isLength",
    arguments: [3, 20],
    message: "Name should be between {ARGS[0]} and {ARGS[1]} characters"
  })
];
// E-mail Validator
var emailValidator = [
  validate({
    validator: "isEmail",
    message: "E-mail is not a valid."
  }),
  validate({
    validator: "isLength",
    arguments: [15, 50],
    message: "Email should be between {ARGS[0]} and {ARGS[1]} characters"
  })
];
// Password Validator
var passwordValidator = [
  validate({
    validator: "isLength",
    arguments: [4, 100],
    message: "Password should be between {ARGS[0]} and {ARGS[1]} characters"
  })
];
// Role Validator
var rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} ce nest pas une role valide!"
};

const UserSchema = mongoose.Schema(
  {
    name: { type: String, default: "" },
    surname: { type: String, default: "" },
    age: { type: Number, default: 1 },
    email: { type: String, required: true, validate: emailValidator },
    password: { type: String, required: true, validate: passwordValidator },
    img: { type: String, required: false },
    roles: { type: String, default: "USER_ROLE", enum: rolesValidos },
    google: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: true },
    passwordResetToken: String,
    passwordResetExpires: Date,
    orders: [
      {
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: "OrderModel" }
      }
    ]
  },
  { timestamps: true }
);

// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre("save", async function(next) {
  try {
    var user = this;
    if (this.isModified("password") || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    }
  } catch (error) {
    console.log("error: ", error);
  }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = async (reqBodyPwd, dbUserPwd) => {
  const comparePwd = await bcrypt.compare(reqBodyPwd, dbUserPwd);
  return comparePwd;
};

var User = mongoose.model("UserModel", UserSchema);
module.exports = User;
