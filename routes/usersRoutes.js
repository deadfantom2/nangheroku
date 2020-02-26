const expres = require("express");
const User = require("../models/User");
const middlewareAuth = require("../middleware/check-auth");
const app = expres.Router();

app.get("/", async (req, res) => {
  const getAllUsers = await User.find().populate("orders.order_id");
  res
    .status(200)
    .json({ message: "Successfully fetch data!", users: getAllUsers });
});

app.get("/:id", async (req, res) => {
  const getUserById = await User.findById({ _id: req.params.id }).populate(
    "orders.order_id"
  );
  res
    .status(200)
    .json({ message: "Successfully fetch one user by id!", user: getUserById });
});

app.post("/add", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        message: "Account with that email address already exists."
      });
    }

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
        (await createUserDate(createUser.createdAt)),
      user: createUser
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/:id", async (req, res) => {
  const getUserByIdPut = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res
    .status(200)
    .json({ message: "Successfully updated user!", user: getUserByIdPut });
});

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

app.delete("/:id", async (req, res) => {
  const getUserByIdDelete = await User.findOneAndDelete({ _id: req.params.id });
  res
    .status(200)
    .json({ message: "User is deleted!", user: getUserByIdDelete });
});

async function createUserDate(date) {
  const dateInMs = new Date(date).getTime();
  return new Date(dateInMs);
}

async function adminFunction(type, user, req, res) {
  let typeName;
  if (type === "roles") {
    req.body.roles ? (user.roles = req.body.roles) : (user.roles = user.roles);
    typeName = "Role";
  }
  if (type === "activations") {
    user.isVerified === true
      ? (user.isVerified = false)
      : (user.isVerified = true);
    typeName = "Access";
  }
  await user.save();
  res.status(200).json({
    message: typeName + " changed for user: " + user.name,
    user: user
  });
}

module.exports = app;
