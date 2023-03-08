const connection = require('../config/database')
const getAllProduct = async () => {
  let [result] = await connection.query('SELECT sanpham.Magiay,sanpham.tengiay, sanpham.gia, hinhanh.hinhanh,sanpham.Doituongsd  FROM sanpham INNER JOIN hinhanh ON sanpham.magiay = hinhanh.magiay and Other="C"')
  // const results = [err, result]
  return result
}
const getProductByID = async (iD) => {
  let result = await connection.query(`SELECT sanpham.Magiay, sanpham.tengiay, sanpham.gia, hinhanh.hinhanh,sanpham.Doituongsd,hinhanh.Other
  FROM sanpham
  LEFT JOIN hinhanh
  ON sanpham.magiay = hinhanh.magiay where sanpham.magiay= ?`, [iD])
  return result
}
module.exports = {
  getAllProduct, getProductByID
}