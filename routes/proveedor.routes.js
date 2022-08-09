const express = require('express');
const router = express.Router();

/* invocando al archivo de conexion */
const conx = require('../config/conexion');

/* RUTAS PARA TREAR TODOS LOS  REGISTROS */
router.get('/',(req, res)=>{
    /*usando lo siguiente apunta a la carpeta views/index*/    
    conx.query("SELECT * FROM persona WHERE tipo_persona='Proveedor'", (error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.render('../views/proveedor/proveedor_v',{resultados: results});
        }
    });
});

router.get('/proveedor/data', (req, res)=>{    
    conx.query("SELECT * FROM persona WHERE tipo_persona='Proveedor'", (error, results)=>{
        if (error) {
            throw error;            
        }else{
            data = JSON.stringify(results);
            res.send(data);
        }
    });
});

router.get('/create', (req, res)=>{
    res.render('../views/proveedor/create_v');
});

router.get('/edit/:idd', (req, res)=>{
    const idprov = req.params.idd;
    conx.query(
    'SELECT * FROM persona WHERE idpersona=?',[idprov], (error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.render('../views/proveedor/editar_v',{ resul: results[0] })
        }        
    }
    );
});

router.get('/eliminar/:idd', (req, res)=>{
    const idprovee = req.params.idd;
    conx.query(
    "DELETE FROM persona WHERE idpersona=?",[idprovee],(error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.redirect('/proveedor');
        }
    });
});


const prove_Ctrl = require('../controllers/proveedor/proveedor_ctrl')
router.post('/save', prove_Ctrl.save)
router.post('/update', prove_Ctrl.update)

module.exports = router;