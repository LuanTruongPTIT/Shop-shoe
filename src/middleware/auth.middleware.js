const jwt = require('jsonwebtoken');
const loggedinToken = (req, res, next) => {
  if (req.cookies.token) {
    return res.redirect('/trang-chu')
  } else {
    return res.redirect('/Login')
  }
}
const loggedin = (req, res, next) => {
  if (req.session.user) {
    // res.locals.user = req.session.user;
    console.log("thanhcong")
    next();
  } else {
    console.log("that bai")
    return res.render('Login.ejs')
  }
}
const isAuth = (req, res, next) => {
  if (req.session.loggedin) {
    // res.locals.user = req.session.user
    res.redirect('/trang-chu');
  }
  next();
}
const authenticateToken = (req, res, next) => {
  // const authHeader = req.headers['authorization'];
  const token = req.header.token || req.cookies.token;
  if (token) {
    const accessToken = token.split("")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json("Token is not valid")
      };
      req.user = decoded
      next();
    })
  } else {
    return res.status(403).json("Token is not valid")
  }

}
module.exports = {
  loggedin, isAuth, authenticateToken, loggedinToken
}