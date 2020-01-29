const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  try {
    const token = req.cookies.auth || req.headers.authorization.split(".")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = { email: decoded.email, userId: decoded.userId };
    console.log("Check-auth node token: ", token)
    console.log("Check-auth node decoded: ", decoded)
    next();
  } catch (error) {
    console.log("Error: ", error)
    res.status(401).json({ message: "Auth failed!" });
  }


};
