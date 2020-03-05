const mongoose = require("mongoose");

const PhotoSchema = mongoose.Schema(
  {
    name: String,
    route: String,
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usermodel",
      required: true
    }
  },
  { timestamps: true }
);

const Photo = mongoose.model("PhotoModel", PhotoSchema);
module.exports = Photo;
