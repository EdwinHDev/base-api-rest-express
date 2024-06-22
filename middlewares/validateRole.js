
const isAdminRole = (req, res, next) => {

  if(!req.autenticatedUser) {
    return res.status(500).json({
      message: "no se logro validar el token"
    })
  }

  const { role, name } = req.autenticatedUser

  if(role !== 'admin') {
    return res.status(401).json({
      message: `${ name } no es administrador`
    })
  }

  next()

}

const hasRole = ( ...roles ) => {
  return (req, res, next) => {

    if(!req.autenticatedUser) {
      return res.status(500).json({
        message: "no se logro validar el token"
      })
    }

    if(!roles.includes(req.autenticatedUser.role)) {
      return res.status(401).json({
        message: `Es necesario tener uno de estos roles: ${ roles }`
      })
    }

    next()

  }
}

module.exports = {
  isAdminRole,
  hasRole
}