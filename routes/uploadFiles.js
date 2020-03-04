const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const File = require("../models/File");

const app = express();

// Default options
app.use(
  fileUpload({
    limits: { fileSize: 1 * 1024 * 1024 }
  })
);

app.put("/:type", async (req, res, next) => {
  // Fail if the filedon't select
  if (!req.files) {
    return res.status(404).json({
      success: false,
      message: "Select your file please!"
    });
  }

  const type = req.params.type;
  const archive = req.files.fileInput; // Initialize name for input = fileInput
  const typeRoutes = ["profile", "photos", "files"]; // Type of routes
  const extensionsImages = ["png", "jpg", "jpeg", "gif"]; // Type's file extensions

  // Formating name for the file
  const coupeNomImage = archive.name.split(".");
  const extention = coupeNomImage[coupeNomImage.length - 1];

  // Name of image personalize by route
  const imageArchive = `${type}-${new Date().getMilliseconds()}.${extention}`;

  try {
    // Fail route, return this message
    if (typeRoutes.indexOf(type) < 0) {
      return res.status(404).json({
        success: false,
        message: "Fail route!"
      });
    }
    // Rules of the type's file, only the type: xlsx and etc...
    if (extensionsImages.indexOf(extention) < 0) {
      return res.status(400).json({
        success: false,
        message: "Valid extensions are " + extensionsImages.join(", ")
      });
    }

    const pathFolders =
      "./uploads/" + type + "/" + req.userData.id + "-" + req.userData.name;
    const path = pathFolders + "/" + imageArchive;
    const existPath = await fs.existsSync(pathFolders);
    if (!existPath) {
      await fs.mkdirSync(pathFolders);
    }
    await archive.mv(path);
    downloadByType(type, imageArchive, req, res);
  } catch (error) {
    console.log("err: ", error);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Something is wrong"
      });
    }
  }
});

async function downloadByType(type, imageArchive, req, res) {
  if (type === "profile") {
    const fileOne = await File.find({ _userId: req.userData.id });

    if (fileOne[0]) {
      const oldpath =
        "./uploads/" +
        type +
        "/" +
        req.userData.id +
        "-" +
        req.userData.name +
        "/" +
        fileOne[0].name;

      if (fs.existsSync(oldpath)) {
        fs.unlinkSync(oldpath); // Delete the last picture by ID in folder
      }
      fileOne[0].name = imageArchive;
      fileOne[0].route = type;
      const fileNew = await fileOne[0].save();
      return res.status(201).json({
        success: true,
        message: "The picture updated!",
        file: fileNew
      });
    } else {
      const newFile = new File();
      newFile.name = imageArchive;
      newFile.route = type;
      newFile._userId = req.userData.id;
      const fileNew = await newFile.save();
      return res.json({
        success: true,
        message: "The picture created!",
        file: fileNew
      });
    }
  }
  if (type === "photos") {
  }
  if (type === "files") {
  }
}

module.exports = app;
