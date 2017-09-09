'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    nombres: String,
    apellidos: String,
    correo:String,
    password: String,
    rol:String,
    estado:String
});

module.exports = mongoose.model('Usuario',UsuarioSchema);