window.addEventListener('load', () => {

    /* Funciones para no declarar document */
    const $ = (tag) => document.querySelector(tag)
    const id = (tag) => document.getElementById(tag)

    const funcValidate = (obj) => {
        let arr = Object.values(obj)
        console.log(arr);
        if (!arr.includes(false)) {
            btn.disabled = false
            btn.style.backgroundColor = '#1a78fd'
        }else{
            btn.disabled = true
            btn.style.backgroundColor = 'var(--Jorge)'
        }
    }

    

    /* Elementos que se trabajan para validar */
    let titulo = $('#titulo')
    let price = $('#price')
    let discount = $('#discount')
    let categorias = $('#categorias')
    let marcas = $('#marcas')
    let description = $('#description')

    let img = $('#product-img')
    let img2 = $('#product-sub-img-1')
    let img3 = $('#product-sub-img-2')
    let img4 = $('#product-sub-img-3')

    let btn = $('#btn-submit')

    /* Expresiones regulares para utilizar */
    let regExLetter = /^[a-zA-Z\sñáéíóúü]*$/
    let regExNumber = /^[+]?([0-9][0-9]?|150)$/
    const regExExt = /\.(jpg|jpeg|png|jfif|gif|webp)$/

    /* validar elementos */
        /* Titulo del producto */
    titulo.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#tituloError').innerHTML = "Debes ingresar el titulo de tu producto"
                this.classList.add('is-invalid')
                validate.titulo = false
                break;
            case !(this.value.trim().length > 2 && this.value.trim().length < 100):
                $('#tituloError').innerHTML = "El titulo del producto debe 2 letras y maximo 10"
                this.classList.add('is-invalid')
                validate.titulo = false
                break;
            default:
                $('#tituloError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.titulo = true
                break;
        }
        funcValidate(validate)
    })

        /* precio del producto */
    price.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#priceError').innerHTML = "Debes ingresar un precio de tu producto"
                this.classList.add('is-invalid')
                validate.price = false
                break;
            case !(this.value.trim().length >= 2 && this.value.trim().length <= 16):
                $('#priceError').innerHTML = "El precio del producto debe contener 2 caracteres y maximo 10"
                this.classList.add('is-invalid')
                validate.price = false
                break;
            default:
                $('#priceError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.price = true
                break;
        }
        funcValidate(validate)
    })

    discount.addEventListener('blur', function() {
        switch (true) {
            case !(this.value.trim().length <= 2    ):
                $('#discountError').innerHTML = "El descuento no debe ser mayor a 2 cifras"
                this.classList.add('is-invalid')
                validate.discount = false
                break;
            default:
                $('#discountError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.discount = true
                break;
        }
        funcValidate(validate)
    })
    stock.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#stockError').innerHTML = "Debes ingresar el stock de tu producto"
                this.classList.add('is-invalid')
                validate.stock = false
                break;
            case !regExNumber.test(this.value.trim()):
                $('#stockError').innerHTML = "Debes ingresar un numero menor a 100"
                this.classList.add('is-invalid')
                validate.stock = false
                break;
            case !(this.value.trim().length >= 1 && this.value.trim().length <= 16):
                $('#stockError').innerHTML = "El stock del producto debe contener 1 caracteres y maximo 10"
                this.classList.add('is-invalid')
                validate.stock = false
                break;
            default:
                $('#stockError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.stock = true
                break;
        }
        funcValidate(validate)
    })
    categorias.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#categoriaError').innerHTML = "Debes ingresar una categoria"
                this.classList.add('is-invalid')
                validate.categorias = false
                break;
            
            default:
                $('#categoriaError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.categorias = true
                break;
        }
        funcValidate(validate)
    })
    marcas.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#marcaError').innerHTML = "Debes ingresar una marca"
                this.classList.add('is-invalid')
                validate.marcas = false
                break;
            default:
                $('#marcaError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.marcas = true
                break;
        }
        funcValidate(validate)
    })
    description.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#descriptionError').innerHTML = "Debes ingresar una descripcion de tu producto"
                this.classList.add('is-invalid')
                validate.description = false
                break;
            case !(this.value.trim().length >= 10 && this.value.trim().length <= 255):
                $('#descriptionError').innerHTML = "La descripcion del producto debe contener 10 caracteres y maximo 255"
                this.classList.add('is-invalid')
                validate.stock = false
                break;
            default:
                $('#descriptionError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.description = true
                break;
        }
        funcValidate(validate)
    })

    img.addEventListener('change', function() {
        switch (true) {
            case !regExExt.exec(img.value):
                $('#imgError').innerHTML = "Solo se permite ingresar una imagen valida fomato (jpg|jpeg|png|jfif|gif|webp)"
                validate.img = false
                break;
            default:
                $('#imgError').innerHTML = null
                validate.img = true
                break;
        }
        funcValidate(validate)
    })
    img2.addEventListener('change', function() {
        switch (true) {
            case !regExExt.exec(img2.value):
                $('#imgError').innerHTML = "Solo se permite ingresar una imagen valida fomato (jpg|jpeg|png|jfif|gif|webp)"
                validate.img2 = false
                break;
            default:
                $('#imgError').innerHTML = null
                validate.img2 = true
                break;
        }
        funcValidate(validate)
    })
    img3.addEventListener('change', function() {
        switch (true) {
            case !regExExt.exec(img3.value):
                $('#imgError').innerHTML = "Solo se permite ingresar una imagen valida fomato (jpg|jpeg|png|jfif|gif|webp)"
                validate.img3 = false
                break;
            default:
                $('#imgError').innerHTML = null
                validate.img3 = true
                break;
        }
        funcValidate(validate)
    })
    img4.addEventListener('change', function() {
        switch (true) {
            case !regExExt.exec(img4.value):
                $('#imgError').innerHTML = "Solo se permite ingresar una imagen valida fomato (jpg|jpeg|png|jfif|gif|webp)"
                validate.img4 = false
                break;
            default:
                $('#imgError').innerHTML = null
                validate.img4 = true
                break;
        }
        funcValidate(validate)
    })

    /* Validacion */
    const validate = {
        titulo : false,
        price : false,
        discount : true ,
        stock : false ,
        categorias : false ,
        marcas : false ,
        description : false ,
        img : true ,
        img2 : true ,
        img3 : true ,
        img4 : true 
    }

    funcValidate(validate)
})