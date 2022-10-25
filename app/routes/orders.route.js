module.exports = (app) => {
  const router = require('express').Router()
  const { create, findAll, findOne, reportOrder, update, deleteOne, login } = require('../controllers/orders.controller')

  router.post('/', create)

  router.get('/',findAll)

  router.post('/login',login)

  router.get('/f1/:id',findOne)

  router.get('/reportOrder',reportOrder)

//   router.post('/number',number)

  router.put('/:id', update)

  router.delete('/:id', deleteOne)

  //เซ็ต PREFIX
  app.use(process.env.PREFIX + '/orders', router)
}
