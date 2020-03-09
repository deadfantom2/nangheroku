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
  const archive = req.files.fileInput; // Initialize name for input = fileInput
  const typeRoutes = ["profile", "photos", "files"]; // Type of routes
  const extensionsImages = ["png", "jpg", "jpeg", "gif"]; // Type's file extensions images
  const extensionsFiles = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"]; // Type's file extensions files

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
    if (type === "profile") {
      if (extensionsImages.indexOf(extention) < 0) {
        return res.status(400).json({
          success: false,
          message: "Valid extensions are " + extensionsImages.join(", ")
        });
      }
    } else {
      if (extensionsFiles.indexOf(extention) < 0) {
        return res.status(400).json({
          success: false,
          message: "Valid extensions are " + extensionsFiles.join(", ")
        });
      }
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
    let typeMessage = "created";
    const userOne = await User.findById({ _id: req.userData.id });
    if (userOne.img.length !== 0) {
      typeMessage = "updated";
      const oldpath =
        "./uploads/" + type + "/" + req.userData.id + "/" + userOne.img[0].name;
      if (fs.existsSync(oldpath)) {
        fs.unlinkSync(oldpath); // Delete the last picture by ID in folder
      }
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
      message: "The picture " + typeMessage,
      file: updateUserImage
    });
  }
  if (type === "files" || type === "photos") {
    new Promise(async (resolve, reject) => {
      const body = {
        name: imageArchive,
        route: type,
        _userId: req.userData.id
      };
      const newFile = await File.create(body);
      if (newFile) resolve(newFile);
      else reject("Error");
    }).then(async file => {
      // $push add object everytime, exemple: [{},{},{}]
      const updateFilesUser = await User.updateOne(
        { _id: req.userData.id },
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
        post: updateFilesUser
      });
    });
  }
}

module.exports = app;

// dla seba pypsik privlikatelnoi dla seba
// ei nravotsa kogda ona vugladit storinee v etoi odejde chem v drygoi
// kogda nakrashenu gybu

// tebe nravitsa kogda y teba strijka krasivee  kogda tu odenish svoe lubimoe kogda namazit djinsi

// s ogolennumi nogami na kablykax eshe i v takom cvete arkom tu ne kak ne bydesh vugladet stroinee, A SEKSYALNEE DA!!
// stroinee mojno vugladet esli odet' bruki, platie, tyfli
// tvoi podrygi tak ne odelis

// dla seba odevaeshsa, devyska kotoraa ogolaet chasti tela:
//   > intyitivno zazuvaet smotret na nix pokazuvaa svou dostypnost
//   > vesna, templo: xochetsa pokazat svou seksyalnost, privlech vnimanie

// a ne odevaus vuzuvaushe, s parnami esli on ne gai takoe ne prokatuvaet

// mojno odetsa po drygomy i vugladit stroino i krasivo,
//   a tu vsachiski odevaesh to shto vuzovet vnimanie i skaju eshe shto eto ne tak
