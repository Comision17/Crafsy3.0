
const $ = (tag) => document.querySelector(tag);
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const iconCart = $('#cart-btn');
const cart = $('.cart-container');

// captura el elemento con id carrito
const carrito = $("#carrito");

const getVentanaCarrito = async () => {

    try {
        const response = await fetch('/api/carrito')
        const result = await response.json()

        if (result.status === 200) {
            cargarVentanaCarrito(result.data)
        }

    } catch (error) {
        console.log(error)
    }
}
// petición a la API -> listado de carrito
const getCarrito = async () => {

    try {
        const response = await fetch('/api/carrito')
        const result = await response.json()

        if (result.status === 200) {
            cargarCarrito(result.data)
        }

    } catch (error) {
        console.log(error)
    }
}
// Petición para agregar un producto al carrito -> al endpoint -> /api/carrito/id -> POST
const addItem = async (id) => {

    try {
        console.log("Ingreso")
        const response = await fetch(`/api/carrito/${id}`, {
            method: 'POST'
        })
        const result = await response.json()

        if (result.status === 200) {
            cargarVentanaCarrito(result.data)
            cargarCarrito(result.data)
        }

    } catch (error) {
        console.log(error)
    }
}

// Petición para eliminar un producto del carrito -> al endpoint -> /api/carrito/id -> DELETE
const removeItem = async (id) => {

    try {
        const response = await fetch(`/api/carrito/${id}`, {
            method: 'DELETE'
        })
        const result = await response.json()

        if (result.status === 200) {
            cargarVentanaCarrito(result.data)
            cargarCarrito(result.data)
        }

    } catch (error) {
        console.log(error)
    }
}

// Petición para modificar/disminuir la cantidad de un producto -> al endpoint -> /api/carrito/item/id -> DELETE
const modifyItem = async (id) => {
    try {
        const response = await fetch(`/api/carrito/item/${id}`, {
            method: 'DELETE'
        })
        const result = await response.json()

        if (result.status === 200) {
            cargarVentanaCarrito(result.data)
            cargarCarrito(result.data)
        }

    } catch (error) {
        console.log(error)
    }
}

// Petición para vaciar todo el carrito -> al endpoint -> /api/carrito/empty -> DELETE
const empty = async (id) => {
    try {



    } catch (error) {
        console.log(error)
    }
}

// pintar en el DOM la información del carrito
const cargarCarrito = (data) => {

    carrito.innerHTML = "";
    console.log(data)

    if (data.length > 0) {

        let totalCarrito = 0

        data.forEach(producto => {
            let item = `
            <article>
                <div class="imagenes">
                    <img id="img" src="/images/productos/${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="detail">
                    <h4><a id="nombre" href="/products/detail/${producto.id}">${producto.nombre}</a></h4>
                    <div class="añadir-elementos">
                        <button class="restar" onClick="modifyItem('${producto.id}')">-</button>
                        <span ">${producto.cantidad}</span>
                        <button class="agregar" onClick="addItem('${producto.id}')">+</button>
                    </div>
                    <div class="precio-descuento">
                        <p id="precio-sin-descuento" class="precio-secundario">$ ${toThousand(Math.round(producto.precio))}
                            <span id="descuento">${producto.descuento}%</span>-
                        </p>
                        <p id="precio-con-descuento" class="precio-principal">$  ${toThousand(Math.round(producto.precio - (producto.precio * producto.descuento / 100)))}</p>
                    </div>
                </div>
                <button class="eliminar-item" onClick="removeItem('${producto.id}')"><i class="fas fa-times"></i></button>
            </article>
            `
            carrito.innerHTML += item
            totalCarrito += producto.subtotal
        });

        $('#subtotal').innerHTML = `$ ${toThousand(Math.round(totalCarrito))}`
        $('#total').innerHTML = `$ ${toThousand(Math.round(totalCarrito))}`

    } else {
        $('#Numeros').classList.add('none')
        carrito.innerHTML = `
        <article>
            <div>
                <h4>Su carrito está vacio</h4>
                <a href="/">Elegir productos</a>
            </div>
        </article>
        `
    }

}


const cargarVentanaCarrito = (data) => {
    console.log("Se cargaron los datos")
    //console.log(data)
    cart.innerHTML = ""

    if (data.length > 0) {
        let totalCarrito = 0

        data.forEach(producto => {
           
            let item = `
            <div class="cart-item">
                <span class="fas fa-times" onClick="removeItem('${producto.id}')"></span>
                <img src="/images/productos/${producto.imagen}"  alt="">
                <div class="content">
                    <h3>${producto.nombre}</h3>
                    <div class="price">$ ${toThousand(Math.round(producto.precio - (producto.precio * producto.descuento / 100)))}</div>
                    <div class="añadir-elementos">
                        <button class="restar" onClick="modifyItem('${producto.id}')">-</button>
                        <span ">${producto.cantidad}</span>
                        <button class="agregar" onClick="addItem('${producto.id}')">+</button>
                    </div>
                </div>
            </div>
            `
            cart.innerHTML += item
            totalCarrito += producto.subtotal
        })
        cart.innerHTML += `
        <div class="cart-puy">
            <span>Subtotal:</span>
            <span>$ ${toThousand(Math.round(totalCarrito))}</span>
            <a class="" href="/products/cart">Ir a mi carrito</a>
        </div>
        `
    } else {
        
        cart.innerHTML = `
            <h3 class="title">Mi carrito</h3>
            <p>Mensaje bonito para el usuario, con link para ver producto</p>
        `

    }

}


iconCart && iconCart.addEventListener('click', () => {
    cart.classList.toggle('active');
})

// cuando exista carrito(inicamente en la vista de carrito) se ejecutara la función getCarrito()
carrito && getCarrito()

// cuando exista el icono de carrito en el DOM se ejecuta la función de cargarVentanaCarrito()
iconCart && getVentanaCarrito()
