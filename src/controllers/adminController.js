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
    store: (req, res) => {

        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
            let { marca, titulo, categoria, precio, descuento, stock, descripcion } = req.body

            db.Productos.create({
                nombre: titulo,
                precio: +precio,
                descuento: +descuento,
                stock: +stock,
                descripcion,
                categoriasId: categoria,
                marcasId: marca,
            })
            .then( productoNuevo => {

                if (req.files) {
                    let img = req.files.map(imagen => {
                        let nuevo = {
                            nombre: imagen.filename,
                            productosId: productoNuevo.id
                        }
                        return nuevo
                    })

                    db.Imagenes.bulkCreate(img)
                    .then(imagenes => {
                        return res.redirect('/admin/list')
                    })
                }else{
                    db.Imagenes.create({
                        nombre: 'default-image.png',
                        productosId: productoNuevo.id
                    })
                    .then(imagenes => {
                        return res.redirect('/admin/list')
                    })
                }
            })
            .catch(error => res.send(error))
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
        idParams = +req.params.id

        let categorias = db.Categorias.findAll()
        let marcas = db.Marcas.findAll()
        let producto = db.Productos.findOne({
            where: {
                id : idParams
            },
            include: [{
                all:true
            }]
        })
        Promise.all([categorias,marcas,producto])
        .then(([categorias,marcas,producto]) => {
                /* return res.send(imagenes) //Comprobar que esta llegando bien el elemento */
                return res.render('admin/editarProducto', {
                    producto,
                    categorias,
                    marcas
                })
        })
        .catch(error => res.send(error))
    },
    update: (req, res) => {
        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
            const idParams = +req.params.id
            const { marca, titulo, categoria, precio, descuento, stock, descripcion } = req.body

            let producto = db.Productos.findOne({
                where: {
                    id : idParams
                },
                include: [{
                    all:true
                }]
            })
            let actualizacion = db.Productos.update({
                nombre: titulo,
                precio: +precio,
                descuento: +descuento,
                stock: +stock,
                descripcion,
                categoriasId: categoria,
                marcasId: marca,
            },{
                where: {
                    id : idParams
                }
            })

            Promise.all([producto,actualizacion])
           .then(([producto,actualizacion]) => {

                let imagen1
                let imagen2
                let imagen3
                let imagen4

                /* Imagen 1 */
                /* Existe en la base de datos */
                if (producto.imagenes[0].length !== 0) {
                    /* viene una imagen nueva */
                    if(!!req.files.imagen1){
                        /* Guardo el nombre en una variable para despues borrarla */
                        imagen1 = producto.imagenes[0].nombre
                        /* La reemplazamos en la base de datos */
                        db.Imagenes.update({
                            nombre:req.files.imagen1[0].filename
                        },{
                            where: {
                                id : producto.imagenes[0].id
                            }
                        })
                        /* Borramos la imagen anterior */
                        if(fs.existsSync(path.join(__dirname,'../../public/images/productos',imagen1))){
                            fs.unlinkSync(path.join(__dirname, '../../public/images/productos', imagen1))
                        }
                    }
                }else{
                    /* Si no existe la imagen en la base de datos, tenemos que crearla */
                    if(!!req.files.imagen1){

                        /* Creamos la imagen en la base de datos */
                        db.Imagenes.create({
                            nombre: req.files.imagen1[0].filename,
                            productosId: producto.id
                        })
                    }
                }

                /* Imagen 2 */
                if (producto.imagenes[1].length !== 0) {
                    if(!!req.files.imagen2){
                        imagen2 = producto.imagenes[1].nombre
                        db.Imagenes.update({
                            nombre:req.files.imagen2[0].filename
                        },{
                            where: {
                                id : producto.imagenes[1].id
                            }
                        })
                        if(fs.existsSync(path.join(__dirname,'../../public/images/productos',imagen2))){
                            fs.unlinkSync(path.join(__dirname, '../../public/images/productos', imagen2))
                        }
                    }
                }else{
                    if(!!req.files.imagen2){
                        db.Imagenes.create({
                            nombre: req.files.imagen2[0].filename,
                            productosId: producto.id
                        })
                    }
                }
                /* Imagen 3 */
                if (producto.imagenes[2].length !== 0) {
                    if(!!req.files.imagen3){
                        imagen3 = producto.imagenes[2].nombre
                        db.Imagenes.update({
                            nombre:req.files.imagen3[0].filename
                        },{
                            where: {
                                id : producto.imagenes[2].id
                            }
                        })
                        if(fs.existsSync(path.join(__dirname,'../../public/images/productos',imagen3))){
                            fs.unlinkSync(path.join(__dirname, '../../public/images/productos', imagen3))
                        }
                    }
                }else{
                    if(!!req.files.imagen3){
                        db.Imagenes.create({
                            nombre: req.files.imagen3[0].filename,
                            productosId: producto.id
                        })
                    }
                }
                /* Imagen 4 */
                if (producto.imagenes[3].length !== 0) {
                    if(!!req.files.imagen4){
                        imagen4 = producto.imagenes[3].nombre
                        db.Imagenes.update({
                            nombre:req.files.imagen4[0].filename
                        },{
                            where: {
                                id : producto.imagenes[3].id
                            }
                        })
                        if(fs.existsSync(path.join(__dirname,'../../public/images/productos',imagen4))){
                            fs.unlinkSync(path.join(__dirname, '../../public/images/productos', imagen4))
                        }
                    }
                }else{
                    if(!!req.files.imagen4){
                        db.Imagenes.create({
                            nombre: req.files.imagen4[0].filename,
                            productosId: producto.id
                        })
                    }
                }
                return res.redirect('/admin/list')
            })
            .catch(error => res.send(error))
        } else {
            return res.render('admin/crearProducto', {
                errors: errors.mapped(),
                old: req.body
            })
        } 
    },
    destroy: (req, res) => {
        let idParams = +req.params.id

        db.Productos.destroy({
            where : {
                id : idParams
            }
        })
        .then(producto => {
            return res.redirect('/admin/history')
        })
        .catch(error => res.send(error))
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