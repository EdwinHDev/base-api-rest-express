const { response } = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

const getUser = async (req, res = response) => {

  const { limit = 5, from = 0, to = 100 } = req.query
  const query = { status: true }

  const [ total, users ] = await Promise.all([
    User.countDocuments( query ),
    User.find( query )
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.status(200).json({
    total,
    from: Number(from),
    limit: Number(limit),
    users
  })

}

const editUser = async (req, res = response) => {
  const { id } = req.params
  const { _id, password, google, email, ...userRes } = req.body

  if(password) {
    const salt = bcrypt.genSaltSync(10)
    userRes.password = bcrypt.hashSync(password, salt)
  }

  try {
    await User.findByIdAndUpdate( id, userRes )
    res.status(200).json({
      message: 'Usuario actualizado correctamente',
      user: userRes
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Algo salio mal, no se pudo actualizar el usuario' })
  }
}

const createUser = async (req, res = response) => {
  const { name = "", email = "", password = "", role = "" } = req.body

  const salt = bcrypt.genSaltSync(10)
  const hashPassword = bcrypt.hashSync(password, salt)

  const newUser = new User({
    name,
    email,
    password: hashPassword,
    image: '',
    role: 'user',
    status: true,
    google: false
  })

  try {
    await newUser.save()
    res.status(200).json({
      message: 'Usuario creado correctamente',
      user: newUser
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Algo salio mal, no se pudo crear el usuario' })
  }
}

const deleteUser = async (req, res = response) => {
  const { id } = req.params

  // Eliminar fisicamente
  // const user = await User.findByIdAndDelete(id)

  await User.findByIdAndUpdate(id, { status: false })

  res.json({ message: 'El usuario fue eliminado correctamente' })
}

module.exports = {
  getUser,
  editUser,
  createUser,
  deleteUser
}