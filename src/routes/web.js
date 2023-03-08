const express = require('express')
const router = express.Router()
const { getHomepage, getNodeJS, getHome, createPostUser, getCreate, getUpdateUser, getEditUser, getTrangChu } = require('../controllers/homeController')

const { } = require('../controllers/homeController')
router.get('/nodejs', getNodeJS);
router.get('/n19dcat047', getHomepage);

router.get('/create', getCreate)
router.post('/create-user', createPostUser)
router.get('/edit/:id', getUpdateUser)
router.post('/update', getEditUser)
router.get('/trang-chu', getTrangChu)


module.exports = router