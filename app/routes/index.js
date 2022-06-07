module.exports = (app) => {
  //ดึงโค้ดมาเรียกแล้วส่งตัวแปร app ไปด้วย
  require('./employee.route')(app)
  require('./users.route')(app)
  require('./product.route')(app)
  require('./orders.route')(app)
  require('./order_detail.route')(app)
  require('./public_relations.route')(app)

}
