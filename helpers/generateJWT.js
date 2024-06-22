const jwt = require('jsonwebtoken')

const generateJWT = ( uid = '' ) => {

  return new Promise((resolve, reject) => {

    const payload = { uid }

    const secret = process.env.SECRET_KEY
    jwt.sign(payload, secret, {
      expiresIn: '4h'
    }, (err, token) => {

      if(err) {
        console.log(err)
        reject('No se pudo generar el token')
      } else {
        resolve( token )
      }

    })

  })

}

module.exports = {
  generateJWT
}