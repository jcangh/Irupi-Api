'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const rutasUsuarios = require('./rutas/RutaUsuario');
const rutasProductos = require('./rutas/RutaProducto');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// configurar cabeceras HTTP
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY,Origin, X-Requested-with, Content-Type,Accept,Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE')
    
    next();
});

//Rutas base
app.use('/api/',rutasUsuarios);
app.use('/api/',rutasProductos);

module.exports = app;