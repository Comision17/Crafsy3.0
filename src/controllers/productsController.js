/* let productos = require('../data/productos.json') */
let db = require('../database/models')
let Sequelize = require('sequelize')

module.exports = {
    detail: (req, res) => {
        let idParams = +req.params.id
        db.Productos.findByPk(idParams, {
            include: [{
                all: true
            }]
        })
            .then(producto => {
                db.Productos.findAll({
                    where: {
                        categoriasId: producto.categoriasId
                    },
                    limit: 4,
                    order: [[Sequelize.literal("RAND()")]],
                    include: [{
                        all: true
                    }]
                })
                    .then(productos => {
                        /* return res.send(productos) */
                        return res.render('detail', {
                            producto,
                            productos
                        })
                    })
            })
            .catch(error => res.send(error))
    },
    cart: (req, res) => {
        res.render('cart')
    },
    categoria: (req, res) => {
        let categoriaSeleccionada = req.params.categoria

        db.Categorias.findOne({
            where: {
                nombre: categoriaSeleccionada
            },
            include : [
                {
                    association : 'productos',
                    include : [{
                        all:true
                    }]
                }
            ]
        })
        .then(categorias => {
            /* return res.send(categorias) */

            return res.render('productos', {
                categorias,
            })
        })
        .catch(error => res.send(error))
    },
}