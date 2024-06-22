const { Schema, model } = require("mongoose")

const userSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: [true, 'El rol es requerido'],
    enum: ['user', 'admin'],
    default: 'user'
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },
})

userSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject()
  user.uid = _id
  return user
}

const User = model('User', userSchema)

module.exports = User