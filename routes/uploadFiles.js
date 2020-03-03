const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const File = require("../models/File");

const app = express();

// Default options
app.use(fileUpload());

app.put("/:type", (req, res) => {
  const type = req.params.type;
  const id = req.params.id;
  const archive = req.files.fileInput; // Initialize name for input = fileInput
  const typeRoutes = ["classes", "machines"]; // Type of routes
  const extensionsImages = ["png", "jpg", "jpeg", "gif"]; // Type's file extensions

  // Fail route, return this message
  if (typeRoutes.indexOf(type) < 0) {
    return res.status(404).json({ success: false, message: "Fail route!" });
  }
  // Fail if the filedon't select
  if (!req.files) {
    return res
      .status(404)
      .json({ success: false, message: "Select your file please!" });
  }
  console.log(req.files.fileInput.name);
  // Formating name for the file
  const coupeNomImage = archive.name.split(".");
  console.log(coupeNomImage);

  const extention = coupeNomImage[coupeNomImage.length - 1];
  console.log(coupeNomImage.length - 1);
  console.log(extention);

  // Rules of the type's file, only the type: xlsx and etc...
  if (extensionsImages.indexOf(extention) < 0) {
    return res.status(400).json({
      success: false,
      message: "Valid extensions are " + extensionsImages.join(", ")
    });
  }

  // Name of image personalize by route
  const imageArchive = `${type}-${new Date().getMilliseconds()}.${extention}`; //564zfdzef564-13.jpg
  console.log(imageArchive);

  // Stock image in folder uploads
  const path = `./uploads/${imageArchive}`;
  archive.mv(path, err => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "It's not possible add the fiel in folder!"
      });
    }
    downloadByType(type, typeRoutes, id, imageArchive, req, res);
  });
});
function downloadByType(type, typeRoutes, id, imageArchive, req, res) {
  console.log("type: ", type);
  console.log("typeRoutes: ", typeRoutes);
  console.log("typeof: ", typeRoutes.indexOf(type));

  // if(type == "classes" || type == "machines") {
  //     console.log("sre")
  //     File.findOne({user_id: req.user._id}, function (err, file) {
  //         if (!file) {
  //             var file = new File();
  //             file.nom = imageArchive;
  //             file.route = type;
  //             file.user_id = req.user._id;
  //             file.save(function (err, file) {
  //                 return res.json({success: true, message: 'Fichier Excel est charge!', file: file});
  //             });
  //         } else {
  //             var oldpath = './uploads/' + file.nom;
  //             //Supprimer l'image precedente
  //             if (fs.existsSync(oldpath)) {
  //                 fs.unlinkSync(oldpath);
  //             }
  //             file.nom = imageArchive;
  //             file.route = type;
  //             file.save(function (err, file) {
  //                 return res.json({success: true, message: 'Image est charges', file: file});
  //             });
  //         }
  //     });
  // }
}

module.exports = app;
