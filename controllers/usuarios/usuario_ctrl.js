const conx = require('../../config/conexion');
var borrar = require("fs");

exports.save = (req, res)=>{
    const name    = req.body.nombre
    const tpo_doc = req.body.tipo_documento
    const num_doc = req.body.num_documento
    const direcci = req.body.direccion
    const telefon = req.body.telefono
    const emailll = req.body.email
    const cargooo = req.body.cargo
    const loginnn = req.body.login
    const claveee = req.body.clave
    const reqfile= req.file

    conx.query(
    "INSERT INTO usuario SET?",
    {nombre: name, tipo_documento: tpo_doc, num_documento: num_doc, direccion: direcci, telefono: telefon, email: emailll, cargo: cargooo, login:loginnn, clave: claveee, imagen: reqfile.filename},
        (errs, results)=>{
            if (errs) {
                console.log(errs);
            } else {
                res.redirect('/usuarios');
            } 
    })
}

exports.save = (req, res)=>{
    const name    = req.body.nombre
    const idus    = req.body.idusuario
    const tpo_doc = req.body.tipo_documento
    const num_doc = req.body.num_documento
    const direcci = req.body.direccion
    const telefon = req.body.telefono
    const emailll = req.body.email
    const cargooo = req.body.cargo
    const loginnn = req.body.login
    const claveee = req.body.clave
    const reqfile= req.file

    if (req.file) {
        if (req.file.filename){
            conx.query(
            'SELECT * FROM usuario WHERE idusuario=?',[idus], (error, results)=>{        
                var nombreImagen ="/usuarios/"+(results[0].imagen)
                
                if (borrar.existsSync(nombreImagen)) {
                    borrar.unlinkSync(nombreImagen);
                }
                conx.query(
                "UPDATE usuario SET? WHERE idusuario=?",
                [{nombre: name, tipo_documento: tpo_doc, num_documento: num_doc, direccion: direcci, telefono: telefon, email: emailll, cargo: cargooo, login:loginnn, clave: claveee, imagen: reqfile.filename}, idus]
                );
                res.redirect('/usuarios');
            });
        }
    }
}





