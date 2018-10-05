const express = require('express')
const app = express()

const bcrypt = require('bcrypt') //Encriptar password solo una vuelta

const _ = require('underscore') //_.pick propiedades validas de un modelo

const Usuario = require('../models/usuario')

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');


app.get('/usuario', verificaToken, (req, res) => {

    //Parametros opcionales siempre caen en el metodo query
    //son enviados atravez de la url (?) y se concatenan con &
    //ejemplo localhost:3000/usuario?desde=5&limite=2

    return res.json({
        usuario: req.usuario,
        nombre: req.usuario.nombre,
        email: req.usuario.email
    })

    let desde = req.query.desde; //obtiene el parametro opcional y lo devuelve como string
    desde = Number(desde); //parsea el string a Number

    let limite = req.query.limite;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email google role img')
        .skip(desde) //Desde que registro queremos obtener
        .limit(limite) //Cuantos registros queremos obtener
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                })

            })

        })
})

app.post('/usuario', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;


    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });



    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es necesario'
    //     })
    // } else {

    // }

    // res.json({
    //     persona: body
    // })
})

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); //campos validos para actualizar

    //findByIdAndUpdate encuentra la coincidencia y actualiza la informacion
    //runValidator corre todas las validaciones realizadas
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        }


        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

})


app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['estado'])

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }

    //     if (!usuarioBorrado) {
    //         res.status(400).json({
    //             ok: false,
    //             err: {
    //                 error: 'Usuarion no encontrado'
    //             }
    //         })
    //     }

    //     res.json({
    //         ok: true,
    //         usuarioBorrado
    //     })

    // })
    Usuario.findByIdAndUpdate(id, { new: true }, (err, usuarioFalse) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        usuarioFalse.estado = false;

        res.json({
            ok: true,
            usuario: usuarioFalse
        });
    })

})

module.exports = app