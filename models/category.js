const { Schema, model } = require('mongoose')

const categorySchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    unique: true
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, 'El estado es requerido'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El id del usuario es requerido'],
  }
})

categorySchema.methods.toJSON = function() {
  const { __v, status, ...category } = this.toObject()
  return category
}

const Category = model("Category", categorySchema)

module.exports = Category