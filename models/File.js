const mongoose = require("mongoose");

const FileSchema = mongoose.Schema(
  {
    name: String,
    route: String,
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel"
    }
  },
  { timestamps: true }
);

const File = mongoose.model("FileModel", FileSchema);
module.exports = File;
