
const express = require('express');
const router = express.Router();

/* invocando al archivo de conexion */
const conx = require('../config/conexion');

/* RUTAS PARA TREAR TODOS LOS  REGISTROS */
router.get('/',(req, res)=>{
    /*usando lo siguiente apunta a la carpeta views/index*/    
    conx.query("SELECT * FROM categoria", (error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.render('../views/categoria/categoria_v',{resultados: results});
        }
    });
});

router.get('/categoria/data', (req, res)=>{    
    conx.query('SELECT * FROM categoria', (error, results)=>{
        if (error) {
            throw error;            
        }else{
            data = JSON.stringify(results);
            res.send(data);
        }
    });
});

router.get('/create', (req, res)=>{
    res.render('../views/categoria/create_v');
});

router.get('/edit/:idd', (req, res)=>{
    const idcate = req.params.idd;
    conx.query(
    'SELECT * FROM categoria WHERE idcategoria=?',[idcate], (error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.render('../views/categoria/editar_v',{ resul: results[0] })
        }        
    }
    );
});

router.get('/desactivar/:idd', (req, res)=>{
    const idcate = req.params.idd;
    conx.query(
    "UPDATE categoria SET condicion='0' WHERE idcategoria=?",[idcate],(error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.redirect('/categoria');
        }
    });
});

router.get('/activar/:idd', (req, res)=>{
    const idcate = req.params.idd;
    conx.query(
    "UPDATE categoria SET condicion='1' WHERE idcategoria=?",[idcate],(error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.redirect('/categoria');
        }
    });
});


const cate_Ctrl = require('../controllers/categoria/categoria_ctrl')
router.post('/save', cate_Ctrl.save)
router.post('/update', cate_Ctrl.update)

module.exports = router;