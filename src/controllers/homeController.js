const connection = require('../config/database')
const { getAllUser, getUserById } = require('../services/crudServices')
const { getAllProduct } = require('../models/product.model')
const getHomepage = (req, res) => {
  res.send('Xin chao toi ten la Truong Dinh Kim Luan')
}
const getNodeJS = (req, res) => {
  res.redirect('/home')
}
const getCreate = async (req, res) => {

}
const createPostUser = async (req, res) => {
  let { name, age } = req.body;
  const [result, field] = await connection.query(`INSERT INTO user values(?,?,?)`, [4, name, age])

}
const getUpdateUser = async (req, res) => {
  try {
    const userID = await getUserById(req.params.id);

    if (userID.length < 0) {
      res.render('home.ejs', { message: "Not found data" })
      return;
    }
    return res.render('edit.ejs', { userEdit: userID[0] })
  } catch (error) {
    console.log(error)
  }
}
const getEditUser = (res, req) => {
  return res.redirect('/home')
}
const getTrangChu = async (req, res) => {
  let resultAllProduct = await getAllProduct();
  const sessionCart = req.session.cart;
  return res.render('trang-chu.ejs', { allProduct: resultAllProduct, cart: sessionCart })
}


module.exports = {
  getHomepage,
  getNodeJS,
  createPostUser,
  getCreate,
  getUpdateUser,
  getEditUser,
  getTrangChu
}
