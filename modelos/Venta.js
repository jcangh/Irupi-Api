'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VentaSchema = Schema({
    cliente: String,
    mes: String,
    fecha_venta:Date,
    cantidad: Number,
    total:Number,
    comentarios:String,
    usuario_registro:String,
    producto:{type: Schema.ObjectId, ref : 'Producto'}
});

module.exports = mongoose.model('Venta',VentaSchema);