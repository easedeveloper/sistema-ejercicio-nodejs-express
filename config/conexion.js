const mysql = require('mysql');

const conex = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dbsistema'
});

conex.connect((error)=>{
    if (error) {
        console.error('El error de la conexiones: '+ error);
        return
    }
    console.log('!Conectado a la DB MYSQL');
});


module.exports = conex;