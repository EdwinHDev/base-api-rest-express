const { response } = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const { generateJWT } = require('../helpers/generateJWT')

const login = async (req, res = response) => {

  const { email, password } = req.body

  try {

    const user = await User.findOne({ email })

    if( !user ) {
      return res.status(400).json({
        message: 'El email o contraseña no son válidos'
      })
    }

    if( !user.status ) {
      return res.status(400).json({
        message: 'El email o contraseña no son válidos'
      })
    }

    const validPassword = bcrypt.compareSync( password, user.password )

    if( !validPassword ) {
      return res.status(400).json({
        message: 'El email o contraseña no son válidos'
      })
    }

    const token = await generateJWT( user.id )

    res.status(200).json({
      user,
      token
    })
    
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal'
    })
  }

}

module.exports = {
  login,
}