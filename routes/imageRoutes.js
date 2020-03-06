const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.get("/:type/:image", async (req, res) => {
  console.log("dsf");
  const type = req.params.type;
  const image = req.params.image;
  const pathImage = path.resolve(
    __dirname,
    "../uploads/" + type + "/" + req.userData.id + "/" + image
  );

  if (fs.existsSync(pathImage)) {
    res.sendFile(pathImage);
  } else {
    const pathNonImage = path.resolve(__dirname, "../assets/no-img.jpg");
    res.sendFile(pathNonImage);
  }
});

module.exports = app;
