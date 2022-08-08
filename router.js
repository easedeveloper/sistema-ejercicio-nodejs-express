
const express = require('express');
const router = express.Router();

/* invocando al archivo de conexion */
const conx = require('./config/conexion');

/* RUTAS PARA TREAR TODOS LOS  REGISTROS */
router.get('/',(req, res)=>{
    /*usando lo siguiente apunta a la carpeta views/index*/    
    conx.query('SELECT * FROM categoria', (error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.render('categoria',{resultados: results});
        }
    });
});

router.get('/data', (req, res)=>{    
    conx.query('SELECT * FROM categoria', (error, results)=>{
        if (error) {
            throw error;            
        }else{
            data = JSON.stringify(results);
            res.send(data);
        }
    });
});

module.exports = router;