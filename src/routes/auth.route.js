const express = require('express')
const routers = express.Router();
const authMiddleware = require('../middleware/auth.middleware')
const { getMyAccount } = require('../controllers/MyAccount')
const { createUser, register } = require('../controllers/RegisterController')
const { getLogin, getLoginUser } = require('../controllers/LoginController');
routers.get('/register', createUser)
routers.post('/register', register)
routers.get('/login', authMiddleware.loggedin, getLogin)
routers.post('/login', getLoginUser)
routers.get('/my-account', authMiddleware.loggedin, getMyAccount)

module.exports = routers