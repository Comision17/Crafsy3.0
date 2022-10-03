let db = require('../database/models')

module.exports = {
    home : (req,res) => {
        
        let aside = db.Asides.findAll()
        let productos = db.Productos.findAll({
            include: ['category','marca','imagenes']
        })
        Promise.all([productos,aside])
        .then(([productos,aside]) => {
            /* return res.send(productos) */
            return res.render('index',{
                mensaje: 'Aca estamos aprendiendo controladores',
                aside,
                productos
            });
        })
        .catch(error => res.send(error))
    },
    search : (req,res) => {
        let elemento = req.query.search

        let resultados = productos.filter(producto => {
            return producto.marca.toLowerCase() === elemento.toLowerCase() || (producto.titulo.toLowerCase().includes(elemento.toLowerCase())) /* || (producto.descripcion.toLowerCase().includes(elemento.toLowerCase())) */
        })
        /* Codigo de nico */
        /* let resultados = productos.filter(producto => {
            return (producto.titulo.toLowerCase().indexOf(elemento.toLowerCase()) != -1)
        }) */

        return res.render('busqueda', 
        {
            busqueda: elemento,
            resultados
        });
    }
}
