const path = require('path')
const fs = require('fs')
const { fileUpload } = require('../helpers')
const { User, Product } = require('../models')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const uploadFile = async (req, res) => {

  try {
    const name = await fileUpload(req.files)
    res.status(200).json({ name })
  } catch (msg) {
    res.status(400).json({ msg })
  }
}

const updateImage = async (req, res) => {

  const { id, collection } = req.params

  let model

  switch (collection) {
    case 'users':
      model = await User.findById( id )
      if(!model) {
        return res.status(400).json({ message: 'No existe un usuario con ese ID' })
      }
    break

    case 'products':
      model = await Product.findById( id )
      if(!model) {
        return res.status(400).json({ message: 'No existe un producto con ese ID' })
      }
    break
  
    default:
      return res.status(500).json({ message: 'Algo salio mal' })
  }

  // limpiar imagenes previas
  if(model.image) {
    const imagePath = path.join(__dirname, '../uploads', collection, model.image )
    if(fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }
  }

  const name = await fileUpload(req.files, undefined, collection)
  model.image = name

  await model.save()

  res.status(400).json({ model })
}

const updateImageCloudinary = async (req, res) => {

  const { id, collection } = req.params

  let model

  switch (collection) {
    case 'users':
      model = await User.findById( id )
      if(!model) {
        return res.status(400).json({ message: 'No existe un usuario con ese ID' })
      }
    break

    case 'products':
      model = await Product.findById( id )
      if(!model) {
        return res.status(400).json({ message: 'No existe un producto con ese ID' })
      }
    break
  
    default:
      return res.status(500).json({ message: 'Algo salio mal' })
  }

  // limpiar imagenes previas
  if(model.image) {
    const cutName = model.image.split('/')
    const name = cutName[cutName.length - 1]
    const [ public_id ] = name.split('.')
    await cloudinary.uploader.destroy(public_id)
  }

  const { tempFilePath } = req.files.file
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

  model.image = secure_url

  await model.save()

  res.status(400).json({ model })
}

const getImage = async (req, res) => {

  const { id, collection } = req.params

  let model

  switch (collection) {
    case 'users':
      model = await User.findById( id )
      if(!model) {
        return res.status(400).json({ message: 'No existe un usuario con ese ID' })
      }
    break

    case 'products':
      model = await Product.findById( id )
      if(!model) {
        return res.status(400).json({ message: 'No existe un producto con ese ID' })
      }
    break
  
    default:
      return res.status(500).json({ message: 'Algo salio mal' })
  }

  // limpiar imagenes previas
  if(model.image) {
    const imagePath = path.join(__dirname, '../uploads', collection, model.image )
    if(fs.existsSync(imagePath)) {
      return res.sendFile(imagePath)
    }
  }

  const defaultImage = path.join(__dirname, '../assets/no-image.jpg' )
  return res.sendFile(defaultImage)
}


module.exports = {
  uploadFile,
  updateImage,
  updateImageCloudinary,
  getImage
}