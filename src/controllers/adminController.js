const fs = require('fs')
const path = require('path')
const productos = require('../data/productos.json')
const historial = require('../data/historial.json')

let db = require('../database/models')

const { validationResult } = require('express-validator')

module.exports = {
    list: (req, res) => {

        db.Productos.findAll({
            include : [{
                all : true
            }]
        })
        .then(productos => {
            /* return res.send(productos) */
            return res.render('admin/listaProductos', {
                productos,
                redirection: "history"
            })
        })
    },
    create: async (req, res) => {
        try {
            let categorias = await db.Categorias.findAll()
            let marcas = await db.Marcas.findAll()
            return res.render('admin/crearProducto',{
                categorias,
                marcas
            })
        } catch (error) {
            return res.send(error)
        }
    },
    create2: (req, res) => {
        let categorias = db.Categorias.findAll()
        let marcas = db.Marcas.findAll()
        Promise.all([categorias,marcas])
        .then(([categorias,marcas]) => {
            return res.render('admin/crearProducto2',{
                categorias,
                marcas
            })
        })
        .catch(error => res.send(error))
    },
    store: async (req, res) => {

        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
            try {
                
                

                let { marca, titulo, categoria, precio, descuento, stock, descripcion } = req.body

                let productoNuevo = await db.Productos.create({
                    nombre: titulo,
                    precio: +precio,
                    descuento: +descuento,
                    stock: +stock,
                    descripcion,
                    categoriasId: categoria,
                    marcasId: marca,
                })

                if (req.files) {
                    /* let img = req.files.map(imagen => {
                        return imagen.filename
                    })
                    await img.forEach(imagen => {
                         db.Imagenes.create({
                            nombre: imagen,
                            productosId: productoNuevo.id
                        })
                    }); */

                    let img = req.files.map(imagen => {
                        let nuevo = {
                            nombre: imagen.filename,
                            productosId: productoNuevo.id
                        }
                        return nuevo
                    })

                    let bulkInsert = await db.Imagenes.bulkInsert(img)
                }else{
                    let imagenPorDefecto = await db.Imagenes.create({
                        nombre: 'default-image.png',
                        productosId: productoNuevo.id
                    })
                }
                return res.redirect('/admin/list')
            } catch (error) {
                return res.send(error)
            }
        } else {
            let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', dato))

            req.files.forEach(imagen => {
                if (ruta(imagen) && (imagen !== "default-image.png")) {
                    fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', imagen))
                }
            })
            /* return res.send(errors.mapped()) */
            return res.render('admin/crearProducto', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    edit: (req, res) => {
        let categorias = ['Smartphones', 'Tablets', 'Notebooks']
        id = +req.params.id
        let producto = productos.find((elemento) => {
            return elemento.id == id
        })
        /* return res.send(producto) Comprobar que esta llegando bien el elemento*/
        return res.render('admin/editarProducto', {
            producto,
            categorias
        })
    },
    update: (req, res) => {
        const idParams = +req.params.id
        const { Marca, Titulo, Categoria, Precio, Descuento, Stock, Descripcion } = req.body
        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
            productos.forEach(producto => {
                if (producto.id === idParams) {
                    producto.marca = Marca
                    producto.titulo = Titulo
                    producto.categorias = Categoria
                    producto.precio = +Precio
                    producto.descuento = +Descuento
                    producto.stock = +Stock
                    producto.descripcion = Descripcion
                }
            })
            guardar(productos)
            return res.redirect('/admin/list')
        } else {
            /* return res.send(errors.mapped()) */
            return res.render('admin/crearProducto', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    destroy: (req, res) => {
        idParams = +req.params.id

        let productoParaEliminar = productos.find((elemento) => {
            return elemento.id == idParams
        })

        historial.push(productoParaEliminar)
        guardarHistorial(historial)

        let productosModificados = productos.filter(producto => producto.id !== idParams)
        guardar(productosModificados)

        return res.redirect('/admin/history')
    },
    history: (req, res) => {

        return res.render('admin/listaProductos', {
            productos: historial,
            redirection: "list"
        })
    },
    restore: (req, res) => {
        idParams = +req.params.id

        let productoParaRestaurar = historial.find((elemento) => {
            return elemento.id == idParams
        })
        let lastId = productos[productos.length - 1].id + 1
        productoParaRestaurar.id = lastId

        productos.push(productoParaRestaurar)
        guardar(productos)

        let historialModificado = historial.filter(producto => producto.id !== idParams)
        guardarHistorial(historialModificado)

        return res.redirect('/admin/list')
    },
    crash: (req, res) => {
        idParams = +req.params.id

        let producto = historial.find(product => product.id === idParams)
        let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', dato))

        producto.imagenes.forEach(imagen => {
            if (ruta(imagen) && (imagen !== "default-image.png")) {
                fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', imagen))
            }
        })

        let historialModificado = historial.filter(producto => producto.id !== idParams)
        guardarHistorial(historialModificado)

        return res.redirect('/admin/list')
    },
}