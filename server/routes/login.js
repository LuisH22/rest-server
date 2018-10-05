const express = require('express')
const app = express()

const bcrypt = require('bcrypt') //Encriptar password solo una vuelta
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

module.exports = app;



app.post('/login', (req, res) => {


    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioBD) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })

        }

        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    messsage: 'Usuario o contraseña invalidos'
                }
            })
        }

        if (!bcrypt.compareSync(body.password, usuarioBD.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    messsage: 'Usuario o contraseña invalidos'
                }
            })
        }

        let token = jwt.sign({
            usuario: usuarioBD,
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioBD,
            token
        })
    })

})