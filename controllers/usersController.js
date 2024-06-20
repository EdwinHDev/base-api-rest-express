const { response } = require('express')

const getUser = async (req, res = response) => {
  const { q, name, apikey } = req.query
  res.json({ message: 'get API', query: { q, name, apikey } })
}

const editUser = async (req, res = response) => {
  const { id } = req.params
  res.json({ id })
}

const createUser = async (req, res = response) => {
  const { name, age, profession } = req.body
  res.json({ name, age, profession })
  
}

const deleteUser = async (req, res = response) => {
  res.json({ message: 'delete API' })
}

module.exports = {
  getUser,
  editUser,
  createUser,
  deleteUser
}