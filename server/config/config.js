//===================
// Port
//===================
process.env.PORT = process.env.PORT || 3000


//===================
// Port
//===================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//===================
// Vencimiento token
//===================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//===================
// SEED 
//===================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//===================
// Base de datos
//===================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;


//======================
//Google Client ID
//======================

process.env.CLIENT_ID = process.env.CLIENT_ID || '243362738529-jp9g1as08vuj47n1kfauk2qlqmnp021d.apps.googleusercontent.com'