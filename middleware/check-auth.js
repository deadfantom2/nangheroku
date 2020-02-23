const jwt = require("jsonwebtoken");

// Check if User connected
exports.checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //req.cookies.auth
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = {
      id: decoded._id,
      name: decoded.name,
      roles: decoded.roles
    };
    next();
  } catch (error) {
    if (error) {
      res.status(401).json({
        success: false,
        message: "Authentication failed!"
      });
    }
  }
};

// Verification if User is ADMIN
exports.verificationROLE_ADMIN = async (req, res, next) => {
  const user = req.userData;
  if (user.roles === "ADMIN_ROLE") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "You do not have Administrator access!"
    });
  }
};

// Forbid access for ADMIN changes(role or activation mode account), when you connected
exports.cantChangeYourAdminAccess = async (req, res, next) => {
  var user = req.userData;
  var id = req.params.id;

  if (user.roles === "ADMIN_ROLE" && user.id !== id) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "You can't change your access and permission!"
    });
  }
};
