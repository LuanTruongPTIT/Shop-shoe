const path = require('path');
const express = require('express');
const { config } = require('process');

const configViewEngine = (app) => {
  app.set('views', path.join('./src', 'views'));

  app.set('view engine', 'ejs');
  app.use(express.static(path.join('./src', 'public')))
  // app.use(express.static(path.join(__dirname, 'public')));


}
module.exports = configViewEngine; //cho phep chay ben file index.js//