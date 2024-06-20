const { Router } = require('express')
const { createUser, deleteUser, editUser, getUser } = require('../controllers/usersController')

const router = Router()

router.get('/', getUser)
router.put('/:id', editUser)
router.post('/', createUser)
router.delete('/', deleteUser)

module.exports = router