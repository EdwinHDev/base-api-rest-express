const { Schema, model } = require('mongoose')

const searchSchema = Schema({
  name: {
    type: String,
    required: [true, 'El rol es requerido'],
    unique: true
  }
})

const Search = model("Search", searchSchema)

module.exports = Search