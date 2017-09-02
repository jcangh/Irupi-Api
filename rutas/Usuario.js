'use strict'

const express = require('express');
const ControladorUsuario = require('../controladores/ControladorUsuario');
const api = express.Router();

api.get('/prueba',ControladorUsuario.prueba);
module.exports = api;


