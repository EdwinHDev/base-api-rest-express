const { Schema, model } = require('mongoose')

const productSchema = Schema({
  name: {
    type: String,
    required: [true, 'El rol es requerido'],
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, 'El estado es requerido']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El id del usuario es requerido']
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'El id de la categoría es requerido']
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
  }
})

productSchema.methods.toJSON = function() {
  const { __v, status, ...producto } = this.toObject()
  return producto
}

const Product = model("Product", productSchema)

module.exports = Product