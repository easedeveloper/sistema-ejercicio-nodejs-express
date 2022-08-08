const express = require('express')
const router  = express.Router()
const conx    = require('../config/conexion')
var multer = require('multer');


var fecha = Date.now();
var rutaImg = multer.diskStorage({
    destination: function(request , file, callback){
        /* callback ayuda a colorcar la imagen en la ruta que yo le doy */
        callback(null,'./files/articulos/');
    },
    filename: function(request , file, callback){
        console.log("FILENAME"+file);
        /* cambiandole el nombre */
        callback(null, fecha+"_"+file.originalname);
    }
});
var cargar = multer({ storage: rutaImg });


/******* INDEX ARTICULO ******/
router.get('/',cargar.single("imagen"),(req, res)=>{
    conx.query('SELECT * FROM articulo', (error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.render('../views/articulo/articulo_v',{resultados: results});
        }        
    });
});


router.get('/articulo/data', (req, res)=>{
    conx.query(
    "SELECT a.idarticulo, a.idcategoria, c.nombre AS categoria, a.codigo, a.nombre, "+
    "a.stock, a.descripcion, a.imagen, a.condicion "+
    "FROM articulo a "+
    "INNER JOIN categoria c ON a.idcategoria = c.idcategoria", (error, results)=>{
        if (error) {
            throw error;            
        }else{
            data = JSON.stringify(results);
            res.send(data);
        }        
    });
})


/******* CREAR ARTICULO ******/
router.get('/create', (req, res)=>{    
    conx.query(
    'SELECT * FROM categoria WHERE condicion=?',[1], (error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.render('../views/articulo/create_v',{ resl: results })
        }        
    });
});


/***** EDITAR ARTICULO ******/
router.get('/edit/:idd', (req, res)=>{
    const idarti= req.params.idd;
    conx.query(
    'SELECT * FROM articulo WHERE idarticulo=?',[idarti], (error, resultss)=>{
        if (error) {
            throw error;            
        }else{
            conx.query(
                "SELECT * FROM categoria WHERE condicion=?",[1], (error, results)=>{
                if (error) {
                    throw error;
                }else{
                    console.log(resultss[0]);
                    res.render('../views/articulo/editar_v',{ option: results, resul: resultss[0] })
                }    
            });
        }        
    });
});


/***** DESCATIVAR ARTICULO ******/
router.get('/desactivar/:idd', (req, res)=>{
    const idarti = req.params.idd;
    conx.query(
    "UPDATE articulo SET condicion='0' WHERE idarticulo=?",[idarti],(error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.redirect('/articulo');
        }
    });
});


/******* ACTIVAR ARTICULO ******/
router.get('/activar/:idd', (req, res)=>{
    const idarti = req.params.idd;
    conx.query(
    "UPDATE articulo SET condicion='1' WHERE idarticulo=?",[idarti],(error, results)=>{
        if (error) {
            throw error;            
        }else{
            res.redirect('/articulo');
        }
    });
});

const artic_Ctrl = require('../controllers/articulos/articulo_ctrl');
router.post('/save', cargar.single("imagen"), artic_Ctrl.save)
router.post('/update', cargar.single("imagen"), artic_Ctrl.update)

module.exports = router;
