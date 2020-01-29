const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
// const key = null;
const key = fs.readFileSync(path.resolve('./public'), 'utf8');

exports.encrypt = (toEncrypt) => {
 const buffer = Buffer.from(toEncrypt);
 console.log(buffer)
 const encrypted = crypto.privateEncrypt(key, buffer);
 return encrypted.toString('base64');
}

exports.decrypt = (toDecrypt) => {
 const buffer = Buffer.from(toDecrypt, 'base64');
 const decrypted = crypto.publicDecrypt(key, buffer);
 return decrypted.toString('utf8');
}