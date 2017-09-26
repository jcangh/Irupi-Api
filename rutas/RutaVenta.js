'use strict'

const express = require('express');
const ControladorVenta = require('../controladores/ControladorVenta');
const mdSeguridad = require('../midlewares/seguridad');

const api = express.Router();

//
api.post('/realizar-venta',mdSeguridad.autenticar,ControladorVenta.realizarVenta);
module.exports = api;