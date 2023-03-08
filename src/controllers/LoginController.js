const { findByUserName } = require('../models/user.model')
const jwt = require('jsonwebtoken')
const connection = require('../config/database');
const bcrypt = require('bcrypt')
require('dotenv').config();
const getLogin = (req, res) => {
  return res.render('Login.ejs')
}
const getLoginUser = async (req, res) => {
  const { username, pass } = req.body
  if (username && pass) {
    const resultAndError = await findByUserName(username)
    console.log(resultAndError)
    if (resultAndError.err) {
      res.render('/Login.ej', { message: "Please check!" })
      return;
    }
    if (resultAndError) {

      try {
        const result = await bcrypt.compare(pass, resultAndError[0].password);

        if (result == true) {
          const user = { username: username }
          const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '1h' });
          // res.json(token)
          res.cookie('token', token)
          console.log(token)
          return res.redirect('/trang-chu');
        } else {
          return res.render('Login.ejs', { message: "User is not valid" });
        }
      } catch (err) {
        console.error(err);
        res.render('Login.ejs', { message: "An error occurred while verifying your credentials" });
      }
    }

  } else {
    res.render('Login.ejs', { message: "Username or password is Failed " })
  }
}
module.exports = { getLogin, getLoginUser }