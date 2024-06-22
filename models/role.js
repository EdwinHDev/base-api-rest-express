const { Schema, model } = require('mongoose')

const roleSchema = Schema({
  name: {
    type: String,
    required: [true, 'El rol es requerido'],
    unique: true
  }
})

const Role = model("Role", roleSchema)

module.exports = Role