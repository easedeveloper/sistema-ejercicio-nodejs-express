const conx = require('../../config/conexion');

exports.save = (req, res)=>{
    const name    = req.body.nombre;
    const descrip = req.body.descripcion;
    conx.query(
    "INSERT INTO categoria SET?",{nombre: name, descripcion: descrip}, (errs, results)=>{
        if (errs) {
            console.log(errs);
        } else {
            res.redirect('/categoria');
        } 
    });
}

exports.update = (req, res)=>{
    const idcate  = req.body.idcategoria;
    const name    = req.body.nombre;
    const descrip = req.body.descripcion;
    conx.query(
    "UPDATE categoria SET? WHERE idcategoria=?",
    [{nombre: name, descripcion: descrip},idcate], (errs, results)=>{
        if (errs) {
            console.log(errs);
        } else {
            res.redirect('/categoria');
        }       
    });
};


