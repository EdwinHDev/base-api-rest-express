const { Category, Role, User, Product } = require('../models')

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

const existCategoryById = async (id) => {
  const category = await Category.findById(id)
  if(!category) {
    throw new Error(`No existe una categoría con ese ID`)
  }
}

const existProductById = async (id) => {
  const product = await Product.findById(id)
  if(!product) {
    throw new Error(`No existe un producto con ese ID`)
  }
}

const allowedCollections = ( collection = '', collections = []) => {

  const included = collections.includes( collection )
  if(!included) {
    throw new Error(`La coleción ${ collection } no es permitida`)
  }

  return true

}

module.exports = {
  isValidRole,
  existUser,
  existUserById,
  existCategoryById,
  existProductById,
  allowedCollections
}