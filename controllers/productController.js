const { response } = require('express')

const { Product } = require('../models')

// publico
const getProducts = async (req, res) => {
  const { limit = 5, from = 0, to = 100 } = req.query
  const query = { status: true }

  const [ total, products ] = await Promise.all([
    Product.countDocuments( query ),
    Product.find( query )
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.status(200).json({
    total,
    from: Number(from),
    limit: Number(limit),
    products
  })
}

const getProduct = async (req, res = response) => {

  const { id } = req.params

  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name')

  if(!product) {
    return res.status(404).json({ message: 'No se encontro un producto con ese id' })
  }

  res.status(200).json(product)

}

const createProduct = async (req, res = response) => {

  const { name, price, category, description } = req.body

  const newProduct = new Product({
    name,
    price,
    category,
    description,
    user: req.autenticatedUser._id
  })

  await newProduct.save()

  res.status(201).json({ message: 'Producto creada correctamente' })
}

const updateProduct = async (req, res = response) => {

  const { id } = req.params
  const { status, ...productRes } = req.body

  productRes.name = productRes.name.toUpperCase()
  productRes.user = productRes.user._id
  productRes.price = productRes.price
  productRes.category = productRes.category
  productRes.description = productRes.description
  productRes.available = productRes.available

  try {
    await Product.findByIdAndUpdate( id, productRes, { new: true } )
    res.status(200).json({
      message: 'Producto actualizado correctamente',
      category: productRes
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Algo salio mal, no se pudo actualizar el producto' })
  }
}

const deleteProduct = async (req, res = response) => {

  const { id } = req.params

  await Product.findByIdAndUpdate(id, { status: false }, { new: true })

  res.json({ message: 'El producto fue eliminado correctamente' })
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}