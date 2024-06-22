const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async (name = '') => {
  const role = await Role.findOne({ name })
  if(!role) {
    throw new Error(`El rol '${ name }' no es válido`)
  }
}

const existUser = async (email = '') => {
  const user = await User.findOne({ email })
  if(user) {
    throw new Error(`El email ya esta en uso`)
  }
}

const existUserById = async (id) => {
  const user = await User.findById(id)
  if(!user) {
    throw new Error(`No existe un usuario con ese ID`)
  }
}

module.exports = {
  isValidRole,
  existUser,
  existUserById
}