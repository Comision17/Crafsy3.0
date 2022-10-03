const {check,body} = require('express-validator')
const db = require('../database/models')
const bcryptjs = require('bcryptjs')

module.exports = [
    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    /* Contraseña */
    check('pass').trim()
    .notEmpty().withMessage('Debe ingresar su contraseña').bail()
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),

    body('pass')
        .custom((value, {req}) => {
           return db.Usuarios.findOne({
                where: {
                    email: req.body.email
                }
           })
           .then(user => {
               if(!bcryptjs.compareSync(value, user.dataValues.password)){
                   return Promise.reject()
               }
           })
           .catch(() => {
               return Promise.reject("Email o contraseña incorrecta")
           })
        })
]
