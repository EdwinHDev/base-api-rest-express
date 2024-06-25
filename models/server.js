const express = require('express')
const cors = require('cors')

const usersRoute = require('../routes/userRoute')
const authRoute = require('../routes/authRoute')
const categoryRoute = require('../routes/categoryRoute')
const searchRoute = require('../routes/searchRoute')
const productRoute = require('../routes/productRoute')
const uploadRoute = require('../routes/uploadRoute')
const { dbConnection } = require('../database/config')
const fileUpload = require('express-fileupload')

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      auth: '/api/auth',
      category: '/api/category',
      product: '/api/product',
      search: '/api/search',
      users: '/api/users',
      upload: '/api/upload',
    }

    // Database
    this.connectDB()

    // Middlewares
    this.middlewares()

    // Rutas
    this.routes()
  }

  async connectDB() {
    await dbConnection()
  }

  middlewares() {
    this.app.use( cors() )
    this.app.use( express.json() )
    this.app.use( express.static('public') )
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    }));
  }


  routes() {
    this.app.use(this.paths.auth, authRoute)
    this.app.use(this.paths.category, categoryRoute)
    this.app.use(this.paths.product, productRoute)
    this.app.use(this.paths.search, searchRoute)
    this.app.use(this.paths.users, usersRoute)
    this.app.use(this.paths.upload, uploadRoute)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${ this.port }`)
    })
  }

}

module.exports = Server