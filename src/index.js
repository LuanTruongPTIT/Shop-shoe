const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser())
const port = process.env.PORT || 3000;//port => hardcode
require('dotenv').config();
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const webLogin = require('./routes/auth.route')
const getProduct = require('./routes/product')
const connection = require('./config/database')
const session = require('express-session')

app.use(session({
  secret: "nhom16",
  resave: false,// dat lai session cookie cho moi req
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }

}))

configViewEngine(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(webRoutes);
app.use(webLogin)
app.use(getProduct)

app.listen((port), () => {
  console.log(`Example app listening on port ${port}`)
})
