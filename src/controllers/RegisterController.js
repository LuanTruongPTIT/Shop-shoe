const { findByEmail, create, User } = require('../models/user.model')
const connection = require('../config/database');
const bcrypt = require('bcrypt')
require('dotenv').config();
const createUser = (req, res) => {
  return res.render('Signup.ejs')
}
const register = async (req, res) => {
  const { username, password, gender, email, phone } = req.body;
  console.log(username, password, gender, email, phone)
  if (username && password && gender && email && phone) {
    const [result, field, err] = await connection.query(`SELECT * from quanlygiaydep.user WHERE email =?`, [email])
    if (result.length > 0) {
      const message = "User credentials are exist";
      res.render('Signup.ejs', { message: message });
      return;
    }
    if (err) {
      const message = "User credentials are exist";
      res.render('/Signup.ejs', { message: message });
      // return result[0]
      return;
    }
    await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashed) => {
      const user = new User({
        username: username,
        password: hashed,
        gender: gender,
        email: email,
        phone: phone
      })
      create(user, (err) => {
        if (err) {
          const message = "registration failed"
          res.render('Signup.ejs', { message: message })
          return;
        }

      })
      res.redirect('/login')
    }
    )
  } else {
    const message = "Please check!"
    res.render('Signup.ejs', { message: message })

  }
}
module.exports = {
  createUser,
  register
}