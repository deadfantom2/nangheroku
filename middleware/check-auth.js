const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { decrypt } = require("../utils/crypto");

module.exports = (req, res, next) => {
  try {
    const ENCRYPTION_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX"; // Must be 256 bits (32 characters)
    const IV_LENGTH = 16; // For AES, this is always 16
    const token = decrypt(req.cookies.auth, ENCRYPTION_KEY, IV_LENGTH);
    console.log("req.cookiessss: ", token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = { email: decoded.email, userId: decoded.userId };
    next();
  } catch (error) {
    console.log("Error: ", error);
    res.status(401).json({ message: "Auth failed!" });
  }
};
