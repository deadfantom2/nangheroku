const express = require("express");

const User = require("../models/User");
const Order = require("../models/Order");

const app = express();

app.post("/add", async (req, res) => {
  const fakeIdUser = "5e2080b97db7a815d26942f5";
  // const fakeIdUser = "5e2080a87db7a815d26942f2";

  const body = {
    user_id: fakeIdUser,
    nameBook: req.body.nameBook,
    price: req.body.price
  };
  console.log(body);

  const createOrder = await Order.create(body);
  console.log(createOrder);
  await User.update(
    { _id: fakeIdUser },
    {
      $push: {
        orders: {
          order_id: createOrder._id
        }
      }
    }
  );
  res
    .status(201)
    .json({ success: true, message: "Order created!", order: createOrder });
});

module.exports = app;
