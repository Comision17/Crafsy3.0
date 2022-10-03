const {home,search} = require('../controllers/indexController')
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', home);
router.get('/busqueda', search);

module.exports = router;
