'use strict'

const express = require('express');
const ControladorProducto = require('../controladores/ControladorProducto');
const mdSeguridad = require('../midlewares/seguridad');

const api = express.Router();

//Crear producto
api.post('/producto',mdSeguridad.autenticar,ControladorProducto.crearProducto);
api.get('/productos-lista/',mdSeguridad.autenticar,ControladorProducto.consultarProductosN);
api.get('/producto/:id',mdSeguridad.autenticar,ControladorProducto.consultarProducto);
api.delete('/producto/:id',mdSeguridad.autenticar,ControladorProducto.eliminarProducto);
api.get('/productos/:pagina?',mdSeguridad.autenticar,ControladorProducto.consultarProductos);
api.put('/producto/:id',mdSeguridad.autenticar,ControladorProducto.actualizarProducto);
module.exports = api;