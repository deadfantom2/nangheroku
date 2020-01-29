const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { decrypt } = require("../utils/crypto");

module.exports = (req, res, next) => {
  try {
    var algorithm = "aes-256-gcm";
    var password = "3zTvzr3p67VC61jmV54rIYu1545x4TlY";
    var iv = "crypto";
    const token = decrypt(req.cookies.auth, algorithm, password, iv);
    console.log("req.cookiessss: ", req.cookies);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = { email: decoded.email, userId: decoded.userId };
    // console.log("Check-auth node token: ", token)
    // console.log("Check-auth node decoded: ", decoded)
    next();
  } catch (error) {
    console.log("Error: ", error);
    res.status(401).json({ message: "Auth failed!" });
  }
};
