const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const db = require('../database/models')
/* const usuarios = require('../data/users.json')
const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/users.json')
    , JSON.stringify(dato, null, 4), 'utf-8') */

module.exports = {
    register:(req,res) => {
        return res.render('users/register')
    },
    processRegister:(req,res) => {
        
        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'image',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
            let {name,lastname,email,pass,provincia,pais,genero} = req.body

            db.Usuarios.create({
                nombre: name,
                apellido: lastname,
                genero,
                email,
                password: bcrypt.hashSync(pass, 12),
                pais,
                provincia: provincia,
                imagen: req.file.size > 1 ? req.file.filename : "avatar-porDefecto.png",
                rolId: 2
            })

            /* let usuarioNuevo = {
                id:usuarios[usuarios.length - 1].id + 1,
                name,
                email,
                pass: bcrypt.hashSync(pass, 12),
                pais,
                genero,
                image: req.file.size > 1 ? req.file.filename : "avatar-porDefecto.png",
                rol: "usuario"
            }
            usuarios.push(usuarioNuevo)
            guardar(usuarios) */
            .then(usuario => {
                
                req.session.userLogin = {
                    id : usuario.id,
                    nombre : usuario.nombre,
                    image : usuario.imagen,
                    rol : usuario.rolId
                }

                return res.redirect('/')
            })
            .catch(errores => res.send(errores))
        } else {
            
            let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'images', 'users', dato))

            if (ruta(req.file.filename) && (req.file.filename !== "default-image.png")) {
                fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'images', 'users', req.file.filename))
            }
            
            /* return res.send(errors.mapped()) */
            return res.render('users/register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    login: (req,res) => {
        return res.render('users/login')
    },
    processLogin:(req,res) => {

        let errors = validationResult(req)
        if (errors.isEmpty()) {
        
            const {email,recordarme} = req.body
            /* let usuario = usuarios.find(user => user.email === email) */
            db.Usuarios.findOne({
                where : {
                    email
                }
            })
            .then(usuario => {
                
                req.session.userLogin = {
                    id : usuario.id,
                    nombre : usuario.nombre,
                    image : usuario.imagen,
                    rol : usuario.rolId
                }
                if(recordarme){
                    res.cookie('Crafsy',req.session.userLogin,{maxAge: 1000 * 60 * 60 * 24})
                }
                return res.redirect('/users/profile')
                /* return res.send(req.body) */
            })
            .catch(errores => res.send(errores))
            
        } else {
            /* return res.send(errors.mapped()) */
            return res.render('users/login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    profile: (req,res) => {
        return res.render('users/profile')
    },
    logout : (req,res) => {

        req.session.destroy();
        if(req.cookies.Crafsy){
            res.cookie('Crafsy','',{maxAge: -1})
        }
        return res.redirect('/')
        
    }
}