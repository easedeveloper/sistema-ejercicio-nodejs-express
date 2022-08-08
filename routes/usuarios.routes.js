const express = require('express')
const router  = express.Router();
const conx    = require('../config/conexion')
var multer = require('multer');
const conex = require('../config/conexion');


var fecha = Date.now();
var rutaImg = multer.diskStorage({
    destination: function(request , file, callback){
        /* callback ayuda a colorcar la imagen en la ruta que yo le doy */
        callback(null,'./files/usuarios/');
    },
    filename: function(request , file, callback){
        console.log("FILENAME"+file);
        /* cambiandole el nombre */
        callback(null, fecha+"_"+file.originalname);
    }
});
var cargar = multer({ storage: rutaImg });

router.get('/', (req, res)=>{
    conx.query("SELECT * FROM usuario", (error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.render('../views/usuario/usuario_v'),{resultados: results}
        }
    });
});

router.get('/usuarios/data', (req, res)=>{
    conx.query('SELECT * FROM usuario', (error, results)=>{
        if (error) {
            throw error;            
        }else{
            data = JSON.stringify(results);
            res.send(data);
        }
    });
})

router.get('/create', (req, res)=>{
    res.render('../views/usuario/create_v')
})

router.get('/edit/:idd', (req, res)=>{
    const idusu= req.params.idd;
    conx.query(
    'SELECT * FROM usuario WHERE idusuario=?',[idusu], (error, resultss)=>{
        if (error) {
            throw error;            
        }else{
            res.render('../views/usuario/editar_v',{ resul: resultss[0] })            
        }        
    });
});

router.get('/desactivar/:idd', (req, res)=>{
    const idusu = req.params.idd;
    conx.query(
    "UPDATE usuario SET condicion='0' WHERE idusuario=?",[idusu],(error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.redirect('/usuarios');
        }
    });
});

router.get('/activar/:idd', (req, res)=>{
    const idusu = req.params.idd;
    conx.query(
    "UPDATE usuario SET condicion='1' WHERE idusuario=?",[idusu],(error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.redirect('/usuarios');
        }
    });
});


const usua_Ctrl = require('../controllers/usuarios/usuario_ctrl')
router.post('/save', cargar.single("imagen"), usua_Ctrl.save)
router.post('/update', cargar.single("imagen"), usua_Ctrl.save)

module.exports = router;