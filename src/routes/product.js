const express = require('express')
const { loggedin, isAuth, authenticateToken } = require('../middleware/auth.middleware')
const routers = express.Router();
const { getProductById, addToCart, removeProduct, showCart, getProduct, getViewCart } = require('../controllers/productController')
routers.get('/review:id', getProductById)
routers.get('/show-cart', showCart)
routers.post('/add-to-cart', addToCart)
routers.get('/api/getproduct', getProduct)
routers.get('/view-cart', getViewCart)
routers.delete('remove-product', removeProduct)
module.exports = routers