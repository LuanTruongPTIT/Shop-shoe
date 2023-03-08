const { getProductByID } = require('../models/product.model')
const getProductById = async (req, res) => {
  let iD = req.params.id;
  console.log(iD)
  let [result] = await getProductByID(iD)
  console.log(result)
  res.send(result)
}
const addToCart = (req, res) => {
  const { Magiay, sanpham, hinhanh, gia, mausac, size, soluong } = req.body;
  // const result = req.body;
  if (!req.session.cart) {
    req.session.cart = [];
  }
  const sessionCart = req.session.cart || [];
  const existingItem = sessionCart.find((item) => item.Magiay === Magiay && item.size === size && item.mausac === mausac)
  // console.log(existingItem)
  if (existingItem) {
    existingItem.soluong += soluong;
    existingItem.gia = existingItem.soluong * gia
  } else {
    sessionCart.push({
      Magiay: Magiay,
      sanpham: sanpham,
      hinhanh: hinhanh,
      gia: gia * soluong,
      mausac: mausac,
      size: size,
      soluong: soluong
    })

  }
  req.session.cart = sessionCart;
  // console.log(req.session.cart)
  res.json(sessionCart)
}
const removeProduct = (req, res) => {
  const productId = req.body.id;
  const products = req.session.cart || [];
  for (let i = 0; i < products.length; i++) {
    if (products[i] === productId) {
      products.splice(i, 1);
      break;
    }
  }
  req.session.cart = products;
  res.send({ success: true })
}
const showCart = (req, res) => {
  const sessionCart = req.session.cart;
  console.log(sessionCart)
  res.json(sessionCart)
}
module.exports = {
  getProductById, addToCart, removeProduct, showCart
}