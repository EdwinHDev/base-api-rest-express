const { Router } = require('express')
const { uploadFile, updateImage, getImage, updateImageCloudinary } = require('../controllers/uploadController')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields')
const { isValidRole, existUser, existUserById, allowedCollections } = require('../helpers/dbValidators')
const { validateFile } = require('../middlewares')

const router = Router()

router.post('/', [
  validateFile,
], uploadFile)

router.put('/:collection/:id', [
  validateFile,
  check('id', 'El id no es válido').isMongoId(),
  check('collection').custom( c => allowedCollections( c, ['users', 'products'] )),
  validateFields
], updateImageCloudinary)

router.get('/:collection/:id', [
  check('id', 'El id no es válido').isMongoId(),
  check('collection').custom( c => allowedCollections( c, ['users', 'products'] )),
  validateFields
], getImage)

module.exports = router