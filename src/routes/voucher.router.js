const express = require('express');
const router = express.Router();
const { showDetailVoucher, saveVoucherCoin } = require('../controllers/voucherController')
router.get('/show/voucherdetail/:code', showDetailVoucher)
router.post('/api/coin/change-voucher', saveVoucherCoin)
module.exports = router;