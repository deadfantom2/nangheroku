const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = { email: decoded.email, userId: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
