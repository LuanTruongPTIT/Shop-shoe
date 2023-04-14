const { getVoucherByCode, saveVoucher, updateQuantityVoucher } = require('../models/voucher.model');
const moment = require('moment')
const crypto = require('crypto');
const amqp = require('amqplib');
const q = 'voucher_exchange';
const exchange = 'voucher_exchange'

const { saveCoinAttendance, getTotalCoin, getUpdateCoinUser } = require('../models/coin.model');
// const { channel } = require('diagnostics_channel');
const showDetailVoucher = async (req, res) => {
  const code = req.params.code;
  try {
    let result = await getVoucherByCode(code)
    if (result.length === 0) {
      return res.status(404).json('Data not found')
    } else {
      return res.status(200).json(result[0]);
    }
  } catch (error) {
    return res.status(404).json('Voucher is not found')
  }
}
const listenToAMQP = async () => {
  console.log(process.env.amqp_url_cloud)
  const conn = await amqp.connect(process.env.amqp_url_cloud)
  console.log(conn)
  const channel = await conn.createChannel()

  await channel.assertExchange(exchange, 'direct', { durable: true });
  await channel.assertQueue(q, { durable: true })
  await channel.bindQueue(q, exchange, 'voucher');
  await channel.consume(q, async (msg) => {
    const data = JSON.parse(msg.content.toString())
    console.log(data)
    const replyTo = msg.properties.replyTo;
    const correlationId = msg.properties.correlationId
    let result = await getTotalCoin(data.user_id)
    let total_Coin = 0;
    result[0].forEach((item) => {
      total_Coin = item.total_coin - data.coins_received
    });
    const data_saveVoucher = {
      user_id: data.user_id,
      code_voucher: data.code_voucher,
      date_receive: data.transaction_time
    }
    try {
      await saveCoinAttendance(data)
      await saveVoucher(data_saveVoucher)
      await getUpdateCoinUser(data.user_id, total_Coin)
      await updateQuantityVoucher(data.code_voucher)
    } catch (error) {
      return error
    }
    // channel.sendToQueue(replyTo, Buffer.from('OK'), {
    //   correlationId: correlationId,
    // })
  }, { noAck: true });
}
const saveVoucherCoin = async (req, res) => {
  const UUID = crypto.randomUUID();
  const { user_id, code_voucher, coins_received, transaction_time, transaction_type, status, status_coin } = req.body;
  const data_history_coin = JSON.stringify({
    transaction_id: UUID,
    user_id: user_id,
    coins_received: coins_received,
    transaction_time: moment(transaction_time, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    transaction_type: transaction_type,
    status: status,
    status_coin: status_coin,
    code_voucher: code_voucher
  });
  const channelPromise = await amqp.connect(process.env.amqp_url_cloud)
  const channel = await channelPromise.createChannel();
  await channel.assertExchange(exchange, 'direct', { durable: true });
  await channel.publish(exchange, 'voucher', Buffer.from(data_history_coin));
  // res.send('Request sent')
  try {
    await listenToAMQP();
    return res.status(200).json('Thanh cong')
  } catch (error) {
    return res.status(401).json('Da co loi xay ra')
  }
}

module.exports = { showDetailVoucher, saveVoucherCoin }