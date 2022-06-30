module.exports = (app) => {
  //ดึงโค้ดมาเรียกแล้วส่งตัวแปร app ไปด้วย
  require('./users.route')(app)
  require('./orders.route')(app)
  require('./public_relations.route')(app)

}
