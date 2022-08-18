const validate_req = require('../models/validate_req.models')
const mysql = require('../models/mysql.models')
const { verifyingHash, hashPassword } = require('../models/hashing.models')
const { signtoken } = require('../models/middleware.models')

exports.create = async (req, res) => {
  //ดึงข้อมูลจาก request
  const { odate, ogetdate, oaddress,total,small,big,roll,smallprice,bigprice,rollprice,ostatus,userid } = req.body
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [ userid])) return
  //คำสั่ง SQL
  let sql = `INSERT INTO orders SET ?`
  //ข้อมูลที่จะใส่ ชื่อฟิล : ข้อมูล
  let data = {
    order_date: odate,
    order_getdate: ogetdate,
    order_address: oaddress,
    order_total: total,
    order_small: small,
    order_big: big,
    order_roll: roll,
    order_smallprice: smallprice,
    order_bigprice: bigprice,
    order_rollprice: rollprice,
    order_status: ostatus,
    user_id: userid,


  }
  //เพิ่มข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.create(sql, data, (err, data) => {
    // if ((err.errno = 1062)) {
    //   return res.status(400).json({
    //     message: 'Username already have',
    //   })
    // }

    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(201).json(data)
  })
}

exports.findAll = async (req, res) => {
  //คำสั่ง SQL
  let sql = `SELECT * FROM orders`
  //ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.get(sql, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data) res.status(200).json(data)
    else res.status(204).end()
  })
}

exports.findOne = async (req, res) => {
  //ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [])) return
  //คำสั่ง SQL
  let sql = `SELECT * FROM orders WHERE user_id = ${id}`
  //ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.get(sql, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data) {
           res.status(200).json(data)
    }
    else res.status(204).end()
  })
}

exports.update = async (req, res) => {
  //ดึงข้อมูลจาก request
  const { odate, ogetdate, oaddress, total, small, big, roll, smallprice, bigprice, rollprice, ostatus } = req.body
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  //คำสั่ง SQL
  let sql = `UPDATE orders SET order_date = ?, order_getdate  = ?, order_address = ?, order_total = ?,
            order_small = ?, order_big = ?, order_roll = ?, order_smallprice = ?, order_bigprice = ?, order_rollprice = ?, order_status = ? WHERE order_id = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [odate, ogetdate, oaddress, total, small, big, roll, smallprice, bigprice, rollprice, ostatus, id ]
  //แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()

  })
}

exports.deleteOne = async (req, res) => {
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  //คำสั่ง SQL
  let sql = `DELETE FROM orders WHERE order_id = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [id]
  //ลบข้อมูล โดยส่งคำสั่ง SQL และ id เข้าไป
  await mysql.delete(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}

exports.login = async (req, res) => {
  const { username, password } = req.body

  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [username, password])) return
  // คำสั่ง SQL
  let sql = `SELECT * FROM users WHERE user_name = '${username}'`
  //ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.get(sql, async (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data[0] && verifyingHash(password, data[0].password))  {
      data[0].token = await signtoken({ id: data[0].id },'1d')
      delete data[0].password
      res.status(200).json(data[0])
    } else res.status(204).end()
  })
}


// exports.number =  (req, res) => {
//   const { num1, num2 } = req.body
//   // ตรวจสอบความถูกต้อง request
//   if (validate_req(req, res, [num1, num2])) return

//   let number = num1 * num2
//   let number2 = parseInt(num1) + parseInt(num2)

//   res.status(200).json({
//     num1 : number,
//     num2 : number2
//    })
// }