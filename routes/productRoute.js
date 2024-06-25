const { Router } = require('express')
const { createProduct, deleteProduct, getProduct, getProducts, updateProduct } = require('../controllers/productController')
const { check } = require('express-validator')
const { validateFields, validateJWT, hasRole, isAdminRole } = require('../middlewares')
const { isValidRole, existUser, existUserById, existCategoryById, existProductById } = require('../helpers/dbValidators')

const router = Router()

router.get('/', getProducts)

router.get('/:id', [
  check('id', 'El ID no es válido').isMongoId(),
  check('id').custom( existProductById ),
  validateFields
], getProduct)

// privado con cualquier rol
router.post('/', [
  validateJWT,
  check('user', 'El ID no es válido').isMongoId(),
  check('user').custom( existUserById ),
  check('name', 'El nombre es requerido').not().isEmpty(),
  check('category', 'La categoría es requerida').not().isEmpty(),
  check('category', 'La categoría no es válida').isMongoId(),
  check('category').custom( existCategoryById ),
  validateFields
], createProduct)

// privado con cualquier rol
router.put('/:id', [
  validateJWT,
  check('id', 'El ID no es válido').isMongoId(),
  check('id').custom( existProductById ),
  validateFields
], updateProduct)

// privado solo admin
router.delete('/:id', [
  validateJWT,
  isAdminRole,
  check('id', 'El ID no es válido').isMongoId(),
  check('id').custom( existProductById ),
  validateFields
], deleteProduct)

module.exports = router