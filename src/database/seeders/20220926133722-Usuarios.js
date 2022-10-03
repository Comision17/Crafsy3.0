'use strict';

let listado = require('../../data/users.json')

let usuarios = listado.map(usuario => {
  let elemento = {
    nombre: usuario.name,
    apellido: null,
    genero: usuario.genero,
    email: usuario.email,
    password: usuario.pass,
    pais: usuario.pais,
    provincia: null,
    imagen: usuario.image,
    rolId: usuario.rol === 'admin' ? 1 : 2,
    createdAt:new Date,
    updatedAt:new Date
  }
  return elemento
})

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Usuarios', usuarios, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
