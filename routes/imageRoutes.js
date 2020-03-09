const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.get("/:type/:folder/:image", async (req, res) => {
  const type = req.params.type;
  const folder = req.params.folder;
  const image = req.params.image;
  const pathImage = path.resolve(
    __dirname,
    "../uploads/" + type + "/" + folder + "/" + image
    // "../uploads/" + type + "/" + req.userData.id + "/" + image
  );
  console.log("../uploads/" + type + "/" + folder + "/" + image);
  if (fs.existsSync(pathImage)) {
    res.sendFile(pathImage);
  } else {
    const pathNonImage = path.resolve(__dirname, "../assets/no-img.jpg");
    res.sendFile(pathNonImage);
  }
});

module.exports = app;
