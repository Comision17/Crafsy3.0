let db = require('../../database/models')
const { Op } = require("sequelize");


const productVerify = (carrito, id) => {

    let index = -1;

    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].id === +id) {
            index = i;
            break
        }
    }

    return index
}


module.exports = {
    listCart: async (req, res) => {
        //res.send("Hola!")

        try {

            let response = {
                status: 200,
                meta: {
                    length: req.session.carrito.length,
                    path: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: req.session.carrito
            }
            return res.status(200).json(response)

        } catch (error) {
            res.status(500).json(error)
        }
    },

    addItem: async (req, res) => {

        // recibimos un id producto
        // 1. buscar el producto, traer datos
        // 2. verificar si el usuario tiene o no una orden pendiente
        // ------------- si tiene una orden
        //    - verificar si el producto que esta agregando existe
        //      - si existe, unicamente modificamos la cantidad
        //      - si no existe, agregamos el producto al carrito(crear el registro)
        //      - modificar la session, con la info actualizada
        // ------------- si no tiene una orden pendiente
        //     - creamos un registro/orden de compra asociado al usuario
        //     - creamos un carrito asociado al usurio
        //     - agregamos el producto al carrito
        //     - agregarlo a la session


        //buscamos los datos del producto
        let producto = await db.Productos.findOne({
            where: {
                id: +req.params.id
            },
            include: [
                {
                    association: 'imagenes',
                    attributes: ['nombre']
                }
            ]
        })

        // creamos el objeto/item que se agregara que se pasara a la session
        let item = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            descuento: producto.descuento,
            imagen: producto.imagenes[0].nombre,
            stock: producto.stock,
            cantidad: 1,
            subtotal: (+producto.precio - (+producto.precio * +producto.descuento / 100)) * 1,
            //ordenId: orden.id ,
        }

        // verificamos que si el carrito esta vacio
        if (req.session.carrito.length === 0) {


            let orden = await db.Ordenes.findOne({
                where: {
                    usuariosId: req.session.userLogin.id,
                    status: 'pending'
                }
            })

            // en caso de que el usuario no tenga tenga ninguna orden de compra 'pendiente' asociada 
            if (!orden) {

                // creamos un nuevo registro asociado al usuario
                let newOrden = await db.Ordenes.create({
                    usuariosId: req.session.userLogin.id,
                    status: 'pending'
                })

                //agregamos el dato faltante al Item
                item = {
                    ...item,
                    ordenId: newOrden.id
                }

                // creamos un nuevo registro de carrito asociado a la orden de compra anteriormente creada
                await db.Carritos.create({
                    usariosId: req.session.userLogin.id,
                    productosId: item.id,
                    ordenesId: newOrden.id,
                    cantidad: 1,
                })

                // actualizamos los datos de la session
                req.session.carrito.push(item)

            } else {
                // en caso de que el usuario tenga una orden de compra asociada y el carrito vacio

                item = {
                    ...item,
                    ordenId: orden.id
                }

                await db.Carritos.create({
                    usuariosId: req.session.userLogin.id,
                    productosId: item.id,
                    ordenesId: orden.id,
                    cantidad: 1,
                })

                req.session.carrito.push(item)

            }





        } else {
            // en caso de que el usuario tenga productos en su carrito

            let index = productVerify(req.session.carrito, req.params.id);

            let orden = await db.Ordenes.findOne({
                where: {
                    usuariosId: req.session.userLogin.id,
                    status: 'pending'
                }
            })

            if (index === -1) {
                // el producto no esta dentro del carrito

                item = {
                    ...item,
                    ordenId: orden.id
                }

                await db.Carritos.create({
                    usariosId: req.session.userLogin.id,
                    productosId: item.id,
                    ordenesId: orden.id,
                    cantidad: 1,
                })

                req.session.carrito.push(item)

            } else {
                // el producto existe en el carrito

                let producto = req.session.carrito[index]

                producto.cantidad++;
                producto.subtotal = (+producto.precio - (+producto.precio * +producto.descuento / 100)) * item.cantidad

                req.session.carrito[index] = producto;

                await db.Carritos.update({
                    cantidad: producto.cantidad
                },
                    {
                        where: {
                            ordenesId: producto.ordenId,
                            productosId: producto.id
                        }
                    }
                )
                
            }
        }


    },
    removeItem: async (req, res) => {


    },
    modifyItem: async (req, res) => {


    },
    empty: async (req, res) => {


    },

}
