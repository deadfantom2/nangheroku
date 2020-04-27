const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const User = require("../models/User");
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
  const imageUserId = req.query.imageUserId;
  const archive = req.files.fileInput; // Initialize name for input = fileInput
  const typeRoutes = ["profile", "photos", "files"]; // Type of routes
  const extensionsImages = ["png", "jpg", "jpeg", "gif"]; // Type's file extensions images
  const extensionsFiles = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"]; // Type's file extensions files
  console.log(archive);
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
    if (type === "profile" || type === "photos") {
      if (extensionsImages.indexOf(extention) < 0) {
        return res.status(400).json({
          success: false,
          message: "Valid extensions are " + extensionsImages.join(", ")
        });
      }
    }
    if (type === "files") {
      if (extensionsFiles.indexOf(extention) < 0) {
        return res.status(400).json({
          success: false,
          message: "Valid extensions are " + extensionsFiles.join(", ")
        });
      }
    }

    console.log("req.query.imaimageUserIdgeId: ", req.query.imageUserId);

    let userId;
    if (req.userData.id === imageUserId) {
      userId = req.userData.id;
    } else {
      userId = imageUserId;
    }
    const pathFolders = "./uploads/" + type + "/" + userId;
    console.log("pathFolders: ", pathFolders);
    const path = pathFolders + "/" + imageArchive;
    const existPath = await fs.existsSync(pathFolders);
    if (!existPath) {
      await fs.mkdirSync(pathFolders);
    }
    await archive.mv(path);
    downloadByType(type, imageArchive, userId, req, res);
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

async function downloadByType(type, imageArchive, userId, req, res) {
  if (type === "profile") {
    let typeMessage = "created";
    const userOne = await User.findById({ _id: userId });
    if (userOne.img.length !== 0 && !userOne.img[0].link) {
      console.log("aaaaaaaaaaaaaaa");
      typeMessage = "updated";
      const oldpath =
        "./uploads/" + type + "/" + userId + "/" + userOne.img[0].name;
      console.log(oldpath);
      if (fs.existsSync(oldpath)) {
        fs.unlinkSync(oldpath); // Delete the last picture by ID in folder
      }
    }

    // $set = reset object, delete object and after create, exemple: [{}]
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          img: {
            name: imageArchive,
            route: type
          }
        },
        $unset: { link: "" }
      }
    );
    return res.status(201).json({
      success: true,
      message: "The picture " + typeMessage,
      fileName: imageArchive
    });
  }
  if (type === "files" || type === "photos") {
    new Promise(async (resolve, reject) => {
      const body = {
        name: imageArchive,
        route: type,
        _userId: userId
      };
      const newFile = await File.create(body);
      if (newFile) resolve(newFile);
      else reject("Error");
    }).then(async file => {
      // $push add object everytime, exemple: [{},{},{}]
      const updateFilesUser = await User.updateOne(
        { _id: userId },
        {
          $push: {
            [type]: {
              file_id: file._id
            }
          }
        }
      );
      res.status(201).json({
        success: true,
        message: "File added!",
        file: updateFilesUser
      });
    });
  }
}

module.exports = app;
