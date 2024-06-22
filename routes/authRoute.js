const { Router } = require('express')
const { login } = require('../controllers/authController')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields')
const { isValidRole, existUser, existUserById } = require('../helpers/dbValidators')

const router = Router()

router.post('/login', [
  check('password', 'La contraseña es requerida').not().isEmpty(),
  check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
  check('email', 'El email es requerido').not().isEmpty(),
  check('email', 'El email no es válido').isEmail(),
  validateFields
], login)

module.exports = router