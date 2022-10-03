const express = require('express')
const router = express.Router()
const {detail,cart,categoria} = require('../controllers/productsController')

router.get('/detail/:id',detail)
router.get('/cart',cart)
router.get('/:categoria?',categoria)

module.exports = router;