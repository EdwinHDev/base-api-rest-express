const { Router } = require('express')
const { createUser, deleteUser, editUser, getUser } = require('../controllers/usersController')
const { check } = require('express-validator')

const { hasRole, isAdminRole, validateFields, validateJWT } = require('../middlewares')

const { isValidRole, existUser, existUserById } = require('../helpers/dbValidators')

const router = Router()

router.get('/', getUser)

router.put('/:id', [
  check('id', 'El ID no es válido').isMongoId(),
  check('id').custom( existUserById ),
  check('role').custom( isValidRole ),
  validateFields
], editUser)

router.post('/', [
  check('name', 'El nombre es requerido').not().isEmpty(),
  check('password', 'La contraseña es requerida').not().isEmpty(),
  check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
  check('email', 'El email es requerido').not().isEmpty(),
  check('email', 'El email no es válido').isEmail(),
  // check('role').custom( isValidRole ),
  check('email').custom( existUser ),
  validateFields
], createUser)

router.delete('/:id', [
  validateJWT,
  // isAdminRole,
  hasRole("admin"),
  check('id', 'El ID no es válido').isMongoId(),
  check('id').custom( existUserById ),
  validateFields
], deleteUser)

module.exports = router