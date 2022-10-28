window.addEventListener('load', () => {

    let $ = (elemento) => document.querySelector(elemento)
    console.log("Register vinculado");


    let form = $('#formulario')
    let nombre = $('#name')
    let apellido = $('#lastname')
    let email = $('#email')
    let pais = $('#pais')
    let image = $('#image')
    let terminos = $('#terminos')
    let genero = document.querySelectorAll('.genero')
    let inputPass = $('#pass')
    let inputPass2 = $('#pass2')

    let eye = $('#eye-pass')
    let eye2 = $('#eye-pass2')
    eye.addEventListener('click',(e) => {
        inputPass.type === 'password' ? inputPass.type = 'text' : inputPass.type = 'password'
        if(eye.classList.contains('fa-eye-slash')){
            eye.classList.toggle('fa-eye-slash')
            eye.classList.toggle('fa-eye')
        }else{
            eye.classList.toggle('fa-eye-slash')
            eye.classList.toggle('fa-eye')
        }   
    })

    eye2.addEventListener('click',(e) => {
        inputPass2.type === 'password' ? inputPass2.type = 'text' : inputPass2.type = 'password'
        if(eye2.classList.contains('fa-eye-slash')){
            eye2.classList.toggle('fa-eye-slash')
            eye2.classList.toggle('fa-eye')
        }else{
            eye2.classList.toggle('fa-eye-slash')
            eye2.classList.toggle('fa-eye')
        }   
    })

    nombre.addEventListener('blur',() => {
        switch (true) {
            case !nombre.value:
                $('#nameContainer').innerHTML = "<small>El Nombre es obligatorio</small>"
                nombre.style.border = "1px solid red"
                break;
            default:
                $('#nameContainer').innerHTML = ""
                nombre.style.border = "1px solid black"
                break;
        }
    })
    apellido.addEventListener('blur',() => {
        switch (true) {
            case !apellido.value:
                $('#apellidoContainer').innerHTML = "<small>El apellido es obligatorio</small>"
                apellido.style.border = "1px solid red"
                break;
            default:
                $('#apellidoContainer').innerHTML = ""
                apellido.style.border = "1px solid black"
                break;
        }
    })
    email.addEventListener('blur',() => {
        switch (true) {
            case !email.value:
                $('#emailContainer').innerHTML = "<small>El campo Email es obligatorio</small>"
                email.style.border = "1px solid red"
                break;
            default:
                $('#emailContainer').innerHTML = ""
                email.style.border = "1px solid black"
                break;
        }
    })
    inputPass.addEventListener('blur',() => {
        switch (true) {
            case !inputPass.value:
                $('#passContainer').innerHTML = "<small>La contraseña es obligatoria</small>"
                inputPass.style.border = "1px solid red"
                break;
            default:
                $('#passContainer').innerHTML = ""
                inputPass.style.border = "1px solid black"
                break;
        }
    })
    inputPass2.addEventListener('blur',() => {
        switch (true) {
            case !inputPass2.value:
                $('#passContainer2').innerHTML = "<small>La confirmacion de la contraseña no puede estar vacia</small>"
                inputPass2.style.border = "1px solid red"
                break;
            case inputPass2.value != inputPass.value:
                $('#passContainer2').innerHTML = "<small>Las contraseñas no coinciden</small>"
                inputPass2.style.border = "1px solid red"
                break;
            default:
                $('#passContainer2').innerHTML = ""
                inputPass2.style.border = "1px solid black"
                break;
        }
    })
})