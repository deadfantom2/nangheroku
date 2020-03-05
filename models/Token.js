const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "UserModel"
  },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

const Token = mongoose.model("TokenModel", tokenSchema);
module.exports = Token;
