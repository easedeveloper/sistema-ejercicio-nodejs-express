const express = require('express');

const app = express();
app.set('view engine','ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/files'))
app.use('/categoria', require('./routes/categorias.routes'));
app.use('/articulo',  require('./routes/articulos.routes'));
app.use('/proveedor', require('./routes/proveedor.routes'));
app.use('/usuarios',  require('./routes/usuarios.routes'));



app.listen(5000, ()=>{
    console.log('Server Corriendo en http://localhost:5000');
})


