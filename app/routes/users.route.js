module.exports = (app) => {
  const router = require('express').Router()
  const { verify } = require('../models/middleware.models.js')
  const { create,findAll,findOne,update,deleteOne,login, updatepassword } = require('../controllers/users.controller')

  router.post('/', create)

  router.get('/',findAll)

  router.post('/login',login)

  router.get('/:id',findOne)

//   router.post('/number',number)

  router.put('/:id', update)

  router.put('/password/:id', updatepassword)

  router.delete('/:id', deleteOne)

  //เซ็ต PREFIX
  app.use(process.env.PREFIX + '/users', router)
}
