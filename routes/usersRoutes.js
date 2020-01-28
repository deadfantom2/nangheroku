const expres = require("express");
const User = require("../models/User");
const app = expres.Router();

app.get("/", async (req, res) => {
  const getAllUsers = await User.find().populate("orders.order_id");
  res.status(200).send(getAllUsers);
});

app.get("/:id", async (req, res) => {
  const getUserById = await User.findById({ _id: req.params.id }).populate(
    "orders.order_id"
  );
  res.status(200).send(getUserById);
});

app.post("/add", async (req, res) => {
  let user = new User();
  user.name = req.body.name;
  user.age = req.body.age;
  user.email = req.body.email;
  user.password = req.body.password;
  const createUser = await user.save();
  res.status(201).json({
    message:
      "User:" +
      req.body.email +
      " created! in time: " +
      createDate(createUser.createdAt)
  });
});

app.put("/:id", async (req, res) => {
  const getUserByIdPut = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.status(200).send(getUserByIdPut);
});

app.delete("/:id", async (req, res) => {
  const getUserByIdDelete = await User.findOneAndDelete({ _id: req.params.id });
  res.status(200).send(getUserByIdDelete);
});

function createDate(date) {
  const dateInMs = new Date(date).getTime();
  return new Date(dateInMs);
}

module.exports = app;
