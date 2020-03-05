const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const User = require("../models/User");
const Photo = require("../models/Photo");
const File = require("../models/File");

const app = express();

// Default options
app.use(
  fileUpload({
    limits: { fileSize: 1 * 1024 * 1024 }
  })
);

app.put("/:type", async (req, res) => {
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

    const pathFolders = "./uploads/" + type + "/" + req.userData.id;
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
    const userOne = await User.findById({ _id: req.userData.id });
    if (userOne.img.length === 0) {
      // $push add object everytime, exemple: [{},{},{}]
      const createUserImage = await User.updateOne(
        { _id: req.userData.id },
        {
          $push: {
            img: {
              name: imageArchive,
              route: type
            }
          }
        }
      );
      return res.status(201).json({
        success: true,
        message: "The picture created!",
        file: createUserImage
      });
    } else {
      const oldpath =
        "./uploads/" + type + "/" + req.userData.id + "/" + userOne.img[0].name;

      if (fs.existsSync(oldpath)) {
        fs.unlinkSync(oldpath); // Delete the last picture by ID in folder
      }
      // $set = reset object, delete object and after create, exemple: [{}]
      const updateUserImage = await User.updateOne(
        { _id: req.userData.id },
        {
          $set: {
            img: {
              name: imageArchive,
              route: type
            }
          }
        }
      );
      return res.status(201).json({
        success: true,
        message: "The picture updated!",
        file: updateUserImage
      });
    }
  }
  if (type === "files") {
    const body = {
      name: imageArchive,
      route: type,
      _userId: req.userData.id
    };
    const createFile = await File.create(body);
    const updateFilesUser = await User.updateOne(
      { _id: req.userData.id },
      {
        $push: {
          files: {
            file_id: createFile._id
          }
        }
      }
    );
    res
      .status(201)
      .json({ success: true, message: "File created!", post: updateFilesUser });
  }
  if (type === "photos") {
    const body = {
      name: imageArchive,
      route: type,
      _userId: req.userData.id
    };
    const createPhoto = await Photo.create(body);
    const updatePhotosUser = await User.updateOne(
      { _id: req.userData.id },
      {
        $push: {
          files: {
            file_id: createPhoto._id
          }
        }
      }
    );
    res.status(201).json({
      success: true,
      message: "Photo created!",
      post: updatePhotosUser
    });
  }
}

module.exports = app;
