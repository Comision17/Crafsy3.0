let listado = require('./src/data/productos.json')


let imagenes = []

listado.forEach(producto => {
  let imagen = {
    nombre: producto.imagenes[0],
    productosId: producto.id,
    createdAt:new Date,
    updatedAt:new Date
  }
  let imagen2 = {
    nombre: producto.imagenes[1],
    productosId: producto.id,
    createdAt:new Date,
    updatedAt:new Date
  }
  let imagen3 = {
    nombre: producto.imagenes[2],
    productosId: producto.id,
    createdAt:new Date,
    updatedAt:new Date
  }
  let imagen4 = {
    nombre: producto.imagenes[3],
    productosId: producto.id,
    createdAt:new Date,
    updatedAt:new Date
  }
  imagenes.push(imagen,imagen2,imagen3,imagen4)
})



/* let resultado = random(1,5)
console.log(resultado); */
/*  {
        "imagen":"aside-01.jpg",
        "titulo":"Nunca creeras lo que estas aprendiendo aca"
    }, */
console.log(imagenes);
