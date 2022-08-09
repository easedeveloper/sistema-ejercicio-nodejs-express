const conx = require('../../config/conexion');

exports.save = (req, res)=>{
    const tip_per = req.body.tipo_persona;
    const name    = req.body.nombre;
    const tipo_do = req.body.tipo_documento;
    const num_doc = req.body.num_documento;
    const direcci = req.body.direccion;
    const telefon = req.body.telefono;
    const emailll = req.body.email;
    conx.query(
    "INSERT INTO persona SET?",
    {tipo_persona:tip_per, nombre:name, tipo_documento:tipo_do, num_documento:num_doc, direccion:direcci, telefono:telefon, email:emailll}, (errs, results)=>{
        if (errs) {
            console.log(errs);
        } else {
            res.redirect('/proveedor');
        } 
    });
}

exports.update = (req, res)=>{
    const idperso = req.body.idpersona;
    const tip_per = req.body.tipo_persona;
    const name    = req.body.nombre;
    const tipo_do = req.body.tipo_documento;
    const num_doc = req.body.num_documento;
    const direcci = req.body.direccion;
    const telefon = req.body.telefono;
    const emailll = req.body.email;
    conx.query(
    "UPDATE persona SET? WHERE idpersona=?",
    [{tipo_persona:tip_per, nombre:name, tipo_documento:tipo_do, num_documento:num_doc, direccion:direcci, telefono:telefon, email:emailll}, idperso], (errs, results)=>{
        if (errs) {
            console.log(errs);
        } else {
            res.redirect('/proveedor');
        }       
    });
};


