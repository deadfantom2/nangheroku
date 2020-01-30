const crypto = require("crypto");

// exports.encrypt = (cryptToken, algorithm, password) => {
//   var cipher = crypto.createCipher(algorithm, password);
//   var crypted = cipher.update(cryptToken, "utf8", "hex");
//   crypted += cipher.final("hex");
//   return crypted;
// };
// exports.decrypt = (decryptToken, algorithm, password) => {
//   var decipher = crypto.createDecipher(algorithm, password);
//   var dec = decipher.update(decryptToken, "hex", "utf8");
//   dec += decipher.final("utf8");
//   return dec;
// };


exports.encrypt = (text, ENCRYPTION_KEY, IV_LENGTH) => {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }
  
  exports.decrypt = (text, ENCRYPTION_KEY, IV_LENGTH) => {
    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }