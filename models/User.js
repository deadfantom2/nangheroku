const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, default: "" },
    age: { type: Number, default: 1 },
    email: { type: String, default: "" },
    password: { type: String, default: "password" },
    orders: [
      {
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: "OrderModel" }
      }
    ]
  },
  { timestamps: true }
);

var User = mongoose.model("UserModel", UserSchema);
module.exports = User;
