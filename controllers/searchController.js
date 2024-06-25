const { response } = require('express')
const { User, Category, Product } = require('../models')
const { ObjectId } = require('mongoose').Types

const allowedCollections = [
  'user',
  'category',
  'product',
  'role',
]

const search = async (req, res = response) => {

  const { colection, term } = req.params

  if(!allowedCollections.includes( colection )) {
    return res.status(400).json({ message: 'Esta no es una colección permitida' })
  }

  const searchUser = async (term = '', res) => {

    const isMongoID = ObjectId.isValid(term)

    if(isMongoID) {
      const user = await User.findById(term)
      return res.status(200).json({
        results: ( user ) ? [ user ] : []
      })
    }

    const regex = new RegExp( term, 'i' )

    const users = await User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ status: true }]
    })

    res.status(200).json({
      results: users
    })

  }

  const searchCategory = async (term = '', res) => {

    const isMongoID = ObjectId.isValid(term)

    if(isMongoID) {
      const category = await Category.findById(term)
      return res.status(200).json({
        results: ( category ) ? [ category ] : []
      })
    }

    const regex = new RegExp( term, 'i' )

    const categories = await Category.find({ name: regex, status: true })

    res.status(200).json({
      results: categories
    })

  }

  const searchProduct = async (term = '', res) => {

    const isMongoID = ObjectId.isValid(term)

    if(isMongoID) {
      const product = await Product.findById(term)
      .populate('category', 'name')
      .populate('user', 'name')
      return res.status(200).json({
        results: ( product ) ? [ product ] : []
      })
    }

    const regex = new RegExp( term, 'i' )

    const products = await Product.find({
      $or: [{ name: regex }],
      $and: [{ status: true }, { available: true }]
    }).populate('category', 'name').populate('user', 'name')

    res.status(200).json({
      results: products
    })

  }

  switch (colection) {
    case 'user':
      searchUser(term, res)
      break
    case 'category':
      searchCategory(term, res)
      break
    case 'product':
      searchProduct(term, res)
      break
    
    default:
      res.status(500).json({ message: 'No se ha encontrado nada' })
  }

}

module.exports = {
  search,
}