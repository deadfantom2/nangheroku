const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "usermodel" },
    nameBook: { type: String },
    price: { type: Number }
  },
  { timestamps: true }
);

var Order = mongoose.model("OrderModel", OrderSchema);
module.exports = Order;
