'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
    nombre: String,
    descripcion: String,
    fecha_registro:Date,
    cantidad: Number,
    mes_registro:String,
    precio_col:Number,
    precio_br:Number,
    usuario_registro:String
});

module.exports = mongoose.model('Producto',ProductoSchema);