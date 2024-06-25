const { response } = require('express')
const bcrypt = require('bcryptjs')

const { Category } = require('../models')

// publico
const getCategories = async (req, res) => {
  const { limit = 5, from = 0, to = 100 } = req.query
  const query = { status: true }

  const [ total, categories ] = await Promise.all([
    Category.countDocuments( query ),
    Category.find( query )
      .populate('user', 'name')
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.status(200).json({
    total,
    from: Number(from),
    limit: Number(limit),
    categories
  })
}

const getCategory = async (req, res = response) => {

  const { id } = req.params

  const category = await Category.findById(id)
    .populate('user', 'name')

  if(!category) {
    return res.status(404).json({ message: 'No se encontro una categoría con ese id' })
  }

  res.status(200).json(category)

}

const createCategory = async (req, res = response) => {

  const name = req.body.name.toUpperCase()

  try {
    const category = await Category.findOne({ name })

    if(category) {
      return res.status(400).json({ message: 'Ya existe una categoría con ese nombre' })
    }

    const newCategory = new Category({
      name,
      user: req.autenticatedUser._id
    })

    await newCategory.save()

    res.status(201).json({ message: 'Categoría creada correctamente' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Algo salio mal' })
  }
}

const updateCategory = async (req, res = response) => {

  const { id } = req.params
  const { status, ...categoryRes } = req.body

  categoryRes.name = categoryRes.name.toUpperCase()
  categoryRes.user = categoryRes.user._id

  try {
    await Category.findByIdAndUpdate( id, categoryRes, { new: true } )
    res.status(200).json({
      message: 'Categoría actualizada correctamente',
      category: categoryRes
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Algo salio mal, no se pudo actualizar la categoría' })
  }
}

const deleteCategory = async (req, res = response) => {

  const { id } = req.params

  await Category.findByIdAndUpdate(id, { status: false }, { new: true })

  res.json({ message: 'La categoría fue eliminada correctamente' })
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}