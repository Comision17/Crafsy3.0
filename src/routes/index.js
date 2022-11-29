const {home,search} = require('../controllers/indexController')
const express = require('express');
const db = require('../database/models');
const router = express.Router();

/* GET home page. */
router.get('/', home);
router.get('/busqueda', search);


router.get('/prueba', (req, res) => {
    db.Ordenes.findAll({
        /*usuariosId: req.session.userLogin.id,
        status: 'pending',*/
        include: [
            {
                association : 'carrito',
                attributes: ['productosId', 'cantidad'],
                include: [
                    {
                        association : 'producto',
                        attributes: ['id', 'nombre', 'precio', 'descuento', 'stock'],
                        include: [
                            {
                                association : 'imagenes',
                                attributes: ['nombre']
                            }
                        ]
                    }
                ]
            }
        ]
    })
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => res.send(err))
})
module.exports = router;
