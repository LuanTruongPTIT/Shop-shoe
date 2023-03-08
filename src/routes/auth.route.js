const express = require('express')
const routers = express.Router();
const authMiddleware = require('../middleware/auth.middleware')

const { createUser, register } = require('../controllers/RegisterController')
const { getLogin, getLoginUser } = require('../controllers/LoginController');
routers.get('/register', createUser)
routers.post('/register', register)
routers.get('/login', authMiddleware.authenticateToken, getLogin)
routers.post('/login', getLoginUser)
module.exports = routers