const crypto = require('crypto');
const moment = require('moment')
const { saveCoinAttendance, queryshowCoinAttendance, getTotalCoin, getUpdateCoinUser } = require('../models/coin.model.js')
const { getVoucherCoin } = require('../models/voucher.model.js')

const redirectAttendance = async (req, res) => {
  const user_id = req.session.user;
  let result = await getTotalCoin(user_id[0].id)
  let result_voucher = await getVoucherCoin();

  let total_Coin = 0;
  result[0].forEach((item) => {
    total_Coin = item.total_coin
  })
  const userLoggedIn = JSON.stringify(req.session.user);
  res.render('coin.ejs', { userLoggedIn: userLoggedIn, totalCoin: total_Coin, result_voucher: result_voucher })
}

const showCoinAttendance = async (req, res) => {
  const id_user = req.params.id;
  const results = await queryshowCoinAttendance(id_user);
  try {
    if (results.length > 0) {
      const daysOfWeek = results[0].map(result => result.transaction_time.getDay())

      res.status(200).json({ daysOfWeek: daysOfWeek });
    } else {
      res.status(200).json("Nguoi dung chua diem danh trong tuan nay")
    }
  } catch (error) {
  }
}
const getCoinAttendance = async (req, res) => {
  const uuid = crypto.randomUUID();
  const _id = req.session.user[0].id
  const { value, day, transaction_type, status, status_coin } = req.body;
  const transaction = {
    transaction_id: uuid,
    user_id: _id,
    coins_received: value,
    transaction_time: moment(day, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    transaction_type: transaction_type,
    status: status,
    status_coin: status_coin
  }
  await saveCoinAttendance(transaction);
  let result = await getTotalCoin(_id)
  let total_Coin = 0;
  result[0].forEach((item) => {
    total_Coin = item.total_coin + value
  });
  await getUpdateCoinUser(_id, total_Coin);
  res.status(200).json({ message: 'Điểm danh thành công' })
}
const coinChangeVoucher = (req, res) => {
  res.status(200).json('Thanh congs')
}
module.exports = { getCoinAttendance, redirectAttendance, showCoinAttendance, coinChangeVoucher }