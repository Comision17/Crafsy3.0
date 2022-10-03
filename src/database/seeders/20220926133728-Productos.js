'use strict';

let listado = require('../../data/productos.json')

let listadoCategorias = ['Smartphones','Notebooks','Tablets','Consolas','Televisores','Otros']
let marcas = ['Xiaomi','Samsung','Apple','Nokia','Asus','Noblex','LG','Lenovo','Motorola','Alienware','Dell','MSI']

let productos = []

listado.forEach(producto => {
  let categoria
  let marca
  
  listadoCategorias.forEach((categoriaLista,index) => {
    if (categoriaLista === producto.categoria) {
        return categoria = index + 1
    }
  });

  marcas.forEach((elemento,index) => {
    if ((elemento.toUpperCase()) === (producto.marca.toUpperCase())) {
        return marca = index + 1
    }
  });

  let nuevo = {
    nombre: producto.titulo,
    stock: producto.stock,
    precio: producto.precio,
    descuento: producto.descuento,
    descripcion: producto.descripcion,
    categoriasId: categoria,
    marcasId: marca,
    createdAt:new Date,
    updatedAt:new Date
  }
  productos.push(nuevo)
})

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Productos', productos, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Productos', null, {});
  }
};