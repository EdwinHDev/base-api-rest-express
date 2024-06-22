const express = require('express')
const cors = require('cors')

const usersRoute = require('../routes/userRoute')
const authRoute = require('../routes/authRoute')
const { dbConnection } = require('../database/config')

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.authPath = '/api/auth'
    this.usersPath = '/api/users'

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
  }

  routes() {
    this.app.use(this.authPath, authRoute)
    this.app.use(this.usersPath, usersRoute)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${ this.port }`)
    })
  }

}

module.exports = Server