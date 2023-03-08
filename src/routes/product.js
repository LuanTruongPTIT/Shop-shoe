const express = require('express')
const { loggedin, isAuth, authenticateToken } = require('../middleware/auth.middleware')
const routers = express.Router();
const { getProductById, addToCart, removeProduct, showCart } = require('../controllers/productController')
routers.get('/review:id', getProductById)
routers.get('/show-cart', showCart)
routers.post('/add-to-cart', addToCart)
routers.delete('remove-product', removeProduct)
module.exports = routers