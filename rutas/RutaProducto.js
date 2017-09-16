'use strict'

const express = require('express');
const ControladorProducto = require('../controladores/ControladorProducto');
const mdSeguridad = require('../midlewares/seguridad');

const api = express.Router();

//Crear producto
api.post('/producto',mdSeguridad.autenticar,ControladorProducto.crearProducto);

module.exports = api;