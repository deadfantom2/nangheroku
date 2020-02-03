const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //req.cookies.auth
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = { name: decoded.name };
    next();
  } catch (error) {
    // console.log("Error: ", error);
    if (error) {
      res.status(401).json( {error: { message: "Auth failed!" }} );
    }
  }
};