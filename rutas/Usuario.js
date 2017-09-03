'use strict'

const express = require('express');
const ControladorUsuario = require('../controladores/ControladorUsuario');
const api = express.Router();

api.get('/prueba',ControladorUsuario.prueba);
api.post('/usuario',ControladorUsuario.crearUsuario);
module.exports = api;


