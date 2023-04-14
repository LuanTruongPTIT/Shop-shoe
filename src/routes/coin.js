const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware')
const { getCoinAttendance, redirectAttendance, showCoinAttendance, coinChangeVoucher } = require('../controllers/CoinController')
router.get('/coin', authMiddleware.loggedin, redirectAttendance)
router.get('/coin-attendance/:id', showCoinAttendance)
router.post('/store-coin', authMiddleware.loggedin, getCoinAttendance)
router.post('/coin/voucher', coinChangeVoucher)

module.exports = router 