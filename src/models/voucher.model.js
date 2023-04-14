const connection = require('../config/database')

const getVoucherCoin = () => {
  let result = connection.query('SELECT  id, code, discount_value, voucher_coin,img, condition_price_product, max_usage, usage_count FROM voucher where status = "active"')
  return result;
}
const getVoucherByCode = async (id_Code) => {
  try {
    let result = await connection.query(` SELECT condition_price_product,discount_value,expiration_date,voucher_coin,img from voucher where status = "active" and code='${id_Code}'`);
    return result;
  } catch (error) {
    return error
  }
}
const saveVoucher = async (data) => {
  try {
    await connection.query(`INSERT INTO user_voucher(user_id,voucher_id,date_receive) values(?,?,?) `, [data.user_id, data.code_voucher, data.date_receive])
  } catch (error) {
    return error
  }
}
const updateQuantityVoucher = async (code) => {
  try {
    await connection.query(`UPDATE VOUCHER SET usage_count=usage_count+1 where code='${code}'`)
  } catch (error) {
    return error
  }
}
module.exports = { getVoucherCoin, getVoucherByCode, saveVoucher, updateQuantityVoucher }