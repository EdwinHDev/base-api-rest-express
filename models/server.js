const express = require('express')
const cors = require('cors')

const usersRoute = require('../routes/userRoute')

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.usersPath = '/api/users'

    // Middlewares
    this.middlewares()

    // Rutas
    this.routes()
  }

  middlewares() {
    this.app.use( cors() )
    this.app.use( express.json() )
    this.app.use( express.static('public') )
  }

  routes() {
    this.app.use(this.usersPath, usersRoute)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${ this.port }`)
    })
  }

}

module.exports = Server