require('./config/config')

const express = require('express')
const app = express()

const mongoose = require('mongoose')

const bodyParser = require('body-parser');
//Parse application/x-www-form-urlencoding
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(require('./routes/index'));

//'mongodb://localhost:27017/cafe'
mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;

    console.log('Base de datos: Online');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
})