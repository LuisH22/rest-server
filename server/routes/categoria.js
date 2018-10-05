const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');


//===============================
//Mostrar todas las categorias
//===============================
app.get('/categoria', verificaToken, (req, res) => {

    //Parametros opcionales siempre caen en el metodo query
    //son enviados atravez de la url (?) y se concatenan con &
    //ejemplo localhost:3000/usuario?desde=5&limite=2

    return res.json({
        categoria: req.categoria
    })


});



//===============================
//Mostrar todas las categorias
//===============================
// app.get('/categoria/:id', (req, res) => {




//     console.log('');

// });

//===============================
//Crear nueva categoria
//===============================
app.post('/categoria', [verificaToken, verificaAdmin_Role], (req, res) => {
    //regresa la nueva categoria
    //req.usuario._id
    let body = req.body;

    let user = req.usuario._id;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: user,
    });


    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
    console.log('pos categoria');

});


//===============================
//Actualizar categoria
//===============================
app.put('/categoria/:id', (req, res) => {

    console.log('put categoria');

});

//===============================
//Borrar categoria
//===============================
app.delete('/categoria', (req, res) => {
    //Solo un administrador puede borrar el token
    console.log('delete categoria');

});


module.exports = app;