const { Router } = require('express')
const { getCategories, createCategory, deleteCategory, getCategory, updateCategory } = require('../controllers/categoryController')
const { check } = require('express-validator')
const { validateFields, validateJWT, hasRole, isAdminRole } = require('../middlewares')
const { isValidRole, existUser, existUserById, existCategoryById } = require('../helpers/dbValidators')

const router = Router()

router.get('/', getCategories)

router.get('/:id', [
  check('id', 'El ID no es válido').isMongoId(),
  check('id').custom( existCategoryById ),
  validateFields
], getCategory)

// privado con cualquier rol
router.post('/', [
  validateJWT,
  check('user', 'El ID no es válido').isMongoId(),
  check('user').custom( existUserById ),
  check('name', 'El nombre es requerido').not().isEmpty(),
  validateFields
], createCategory)

// privado con cualquier rol
router.put('/:id', [
  validateJWT,
  check('name', 'El nombre es requerido').not().isEmpty(),
  check('id', 'El ID no es válido').isMongoId(),
  check('id').custom( existCategoryById ),
  validateFields
], updateCategory)

// privado solo admin
router.delete('/:id', [
  validateJWT,
  isAdminRole,
  check('id', 'El ID no es válido').isMongoId(),
  check('id').custom( existCategoryById ),
  validateFields
], deleteCategory)

module.exports = router