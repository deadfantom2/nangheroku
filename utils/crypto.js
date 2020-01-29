const crypto = require("crypto");

exports.encrypt = (cryptToken, algorithm, password) => {
  var cipher = crypto.createCipher(algorithm, password);
  var crypted = cipher.update(cryptToken, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
};
exports.decrypt = (decryptToken, algorithm, password) => {
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = decipher.update(decryptToken, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
};
