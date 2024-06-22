const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async (req, res, next) => {
  
  const token = req.header('x-token')
  
  if(!token) {
    return res.status(401).json({ message: 'Se requiere un token válido' })
  }

  try {

    const secret = process.env.SECRET_KEY
    const { uid } = jwt.verify(token, secret)

    const autenticatedUser = await User.findById(uid)

    if( !autenticatedUser ) {
      return res.status(401).json({ message: 'Token no válido' })
    }

    if( !autenticatedUser.status ) {
      return res.status(401).json({ message: 'Token no válido' })
    }

    req.autenticatedUser = autenticatedUser

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'Token no válido' })
  }

}

module.exports = {
  validateJWT
}