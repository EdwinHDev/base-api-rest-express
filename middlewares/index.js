const validateFields = require('../middlewares/validateFields')
const validateJWT = require('../middlewares/validateJWT')
const validateRole = require('../middlewares/validateRole')
const validateFile = require('../middlewares/validateFile')

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRole,
  ...validateFile
}