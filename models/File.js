var mongoose = require("mongoose");

var FileSchema = mongoose.Schema(
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

var File = (module.exports = mongoose.model("File", FileSchema));
