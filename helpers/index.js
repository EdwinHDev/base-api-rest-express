const dbValidators = require('./dbValidators')
const generateJWT = require('./generateJWT')
const fileUpload = require('./uploadFile')

module.exports = {
  ...dbValidators,
  ...generateJWT,
  ...fileUpload
}