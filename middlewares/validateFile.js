const validateFile = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({ message: 'Ningun archivo fue cargado' })
  }

  next()
}

module.exports = {
  validateFile
}