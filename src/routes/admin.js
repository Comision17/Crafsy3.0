const {list,create,edit,store,update,destroy,history,restore,crash,create2} = require('../controllers/adminController')
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerProducts')
const adminCheck = require('../middlewares/adminCheck')
const productValidator = require('../validations/productsValidation')

/* GET home page. */
router.get('/list',adminCheck, list);
router.get('/history',adminCheck, history);

/* Creando un producto */
router.get('/create',adminCheck, create);
router.get('/create2',adminCheck, create2);
router.post('/create',adminCheck,upload.array('imagen'),productValidator,store);

/* Editando un producto */
router.get('/edit/:id',adminCheck, edit);
router.put('/edit/:id',upload.array('imagenes'),productValidator, update);

/* Eliminando un producto */
router.delete('/destroy/:id', destroy);
router.delete('/restore/:id', restore);
router.delete('/crash/:id', crash);

module.exports = router;
