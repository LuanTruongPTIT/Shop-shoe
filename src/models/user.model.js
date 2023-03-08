const connection = require('../config/database');
const { use } = require('../routes/web');

function User(user) {
  this.username = user.username;
  this.password = user.password;
  this.gender = user.gender;
  this.email = user.email;
  this.phone = user.phone;
}
const findByEmail = async (email) => {

  const [err, result] = await connection.query(`SELECT * from quanlygiaydep.user WHERE email =?`, [email])
  if (err) {
    return err;
  }
  if (result.length > 0) {
    return result[0]
  }
}

const create = (user, result) => {
  connection.query(`INSERT INTO user(username, password, gender, email, phone) values(?,?,?,?,?)`,
    [user.username, user.password, user.gender, user.email, user.phone], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, { ...user });
    })
}
const findByUserName = async (username) => {
  // await connection.query(`SELECT * FROM USER Where username= ?`, [username], (err, res) => {
  //   if (err) {
  //     result(err, null)
  //     return;
  //   }
  //   if (res.length > 0) {
  //     result(null, res[0])

  //   }
  // })
  let [results] = await connection.query(`SELECT * FROM USER Where username= ?`, [username])

  return results;
}
module.exports = {
  findByEmail, create, User, findByUserName
}