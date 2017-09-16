'use strict'

const express = require('express');
const ControladorUsuario = require('../controladores/ControladorUsuario');
const mdSeguridad = require('../midlewares/seguridad');

const api = express.Router();

api.get('/prueba',ControladorUsuario.prueba);
//crear usuario
api.post('/usuario',ControladorUsuario.crearUsuario);
//actualizar usuario
api.put('/usuario/:id',mdSeguridad.autenticar,ControladorUsuario.actualizarUsuario);
//iniciar sesion
api.post('/inicio',ControladorUsuario.iniciarSesion);
//consultar lista de usuarios
api.get('/usuarios/:pagina?',mdSeguridad.autenticar,ControladorUsuario.consultarUsuarios);
//eliminar usuario
api.delete('/usuario/:id',mdSeguridad.autenticar,ControladorUsuario.eliminarUsuario);

module.exports = api;


