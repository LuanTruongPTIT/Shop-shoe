const connection = require('../config/database')
const saveCoinAttendance = async (transaction) => {
  connection.query(`Insert into coin_history (transaction_id,user_id,coins_received,transaction_time,transaction_type,status,status_coin) 
  values(?,?,?,?,?,?,?)`,
    [transaction.transaction_id,
    transaction.user_id,
    transaction.coins_received,
    transaction.transaction_time,
    transaction.transaction_type,
    transaction.status,
    transaction.status_coin
    ])
}
const queryshowCoinAttendance = (id_user) => {
  let result = connection.query(`Select transaction_time FROM coin_history WHERE user_id = '${id_user}'
  AND YEARWEEK(transaction_time, 1) = YEARWEEK(NOW(), 1) AND transaction_type='Điểm danh';`)
  return result;
}
const getTotalCoin = (id_user) => {
  let result = connection.query(`SELECT total_coin FROM user where id = '${id_user}'`)
  return result;
}
const getUpdateCoinUser = (id_user, total_Coin) => {
  connection.query(`UPDATE user SET total_coin = ${total_Coin} WHERE id = '${id_user}';`)
}
module.exports = { saveCoinAttendance, queryshowCoinAttendance, getTotalCoin, getUpdateCoinUser }