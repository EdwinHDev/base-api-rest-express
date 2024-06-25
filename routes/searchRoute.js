const { Router } = require('express')
const { search } = require('../controllers/searchController')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields')
const { isValidRole, existUser, existUserById } = require('../helpers/dbValidators')

const router = Router()

router.get('/:colection/:term', search)

module.exports = router