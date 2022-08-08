const conx = require('../../config/conexion');
var borrar = require("fs");


exports.save = (req, res)=>{
    const name   = req.body.nombre
    const idcate = req.body.idcategoria
    const stocks = req.body.stock
    const descr  = req.body.descripcion    
    const codi   = req.body.codigo
    const reqfile= req.file

    conx.query(
    "INSERT INTO articulo SET?",
    {nombre: name, idcategoria: idcate, stock: stocks, descripcion:descr, imagen: reqfile.filename, codigo: codi },
        (errs, results)=>{
            if (errs) {
                console.log(errs);
            } else {
                res.redirect('/articulo');
            } 
    })
}

exports.update = (req, res)=>{
    const name   = req.body.nombre
    const idcate = req.body.idcategoria
    const idarti = req.body.idarticulo
    const stocks = req.body.stock
    const descr  = req.body.descripcion    
    const codi   = req.body.codigo
    const reqfile= req.file
   
    if (req.file) {
        if (req.file.filename){
            conx.query(
            'SELECT * FROM articulo WHERE idarticulo=?',[idarti], (error, results)=>{        
                var nombreImagen ="/articulos/"+(results[0].imagen)
                
                if (borrar.existsSync(nombreImagen)) {
                    borrar.unlinkSync(nombreImagen);
                }
                conx.query(
                "UPDATE articulo SET? WHERE idarticulo=?",
                [{nombre:name, idcategoria:idcate, stock: stocks, descripcion:descr, imagen: reqfile.filename, codigo:codi}, idarti]
                );
                res.redirect('/articulo');
            });
            
        }
    }
};


function eliminar(req, res)
{
    const idarti = req.body.idarticulo
    conx.query(
    'SELECT * FROM articulo WHERE idarticulo=?',[idarti], (error, results)=>{        
        var nombreImagen ="/articulos/"+(results[0].imagen)
        if (borrar.existsSync(nombreImagen)) {
            borrar.unlinkSync(nombreImagen);
        }
    });
}

