//===================
// Port
//===================
process.env.PORT = process.env.PORT || 3000


//===================
// Port
//===================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//===================
// Base de datos
//===================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://cafe-user:Mongo123456@ds157278.mlab.com:57278/cafe-rest';
} else {
    urlDB = 'mongodb://cafe-user:Mongo123456@ds157278.mlab.com:57278/cafe-rest';
}

process.env.URLDB = urlDB;