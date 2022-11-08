const {list,create,edit,store,update,destroy,history,restore,crash,create2, listV2} = require('../controllers/adminController')
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerProducts')
/* const adminCheck = require('../middlewares/adminCheck')
const productValidator = require('../validations/productsValidation') */

/* GET home page. */
router.get('/list',/* adminCheck, */ listV2);
router.get('/history',/* adminCheck, */ history);

/* Creando un producto */
router.get('/create',/* adminCheck, */ create);
router.get('/create2',/* adminCheck, */ create2);
router.post('/create',/* adminCheck, */upload.array('imagen'),/* productValidator, */store);

/* Editando un producto */
router.get('/edit/:id',/* adminCheck, */ edit);
router.put('/edit/:id',upload.fields([
    {name:'imagen1',maxCount: 1},
    {name:'imagen2',maxCount: 1},
    {name:'imagen3',maxCount: 1},
    {name:'imagen4',maxCount: 1}
]),/* productValidator, */ update);

/* Eliminando un producto */
router.delete('/destroy/:id', destroy);
router.delete('/restore/:id', restore);
router.delete('/crash/:id', crash);

module.exports = router;
