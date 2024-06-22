const mongoose = require("mongoose")

const URI = process.env.MONGO_URI

const dbConnection = async () => {
  try {
    await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 10000
    })

    console.log(`Conexión exitosa en ${ URI }`)

  } catch (error) {
    console.log(error)
    throw new Error('Erro al intentar conectar')
  }
}

module.exports = {
  dbConnection
}