'use strict'
// Contolador de Productos
const bcrypt = require('bcrypt-nodejs');
const Venta = require('../modelos/Venta');
const Producto = require('../modelos/Producto');
const jwt = require('../servicios/jwt');
const mongoosePaginate = require('mongoose-pagination');

function realizarVenta(req,res){
    let parametros = req.body;
    let productoId = parametros.productoId;

    let productoParametro = null;

    let consultaUsuario = Producto.findById(productoId).where('cantidad').gt(parametros.cantidad).exec();
    
    consultaUsuario.then(function (producto){
        return producto;
    }).then(function(producto){
        producto.cantidad = producto.cantidad - parametros.cantidad;
        return Producto.findByIdAndUpdate(productoId,producto).exec();
    }).then(function(producto){
        let fecha = new Date();

        let venta = new Venta();
        venta.cliente = parametros.cliente;
        venta.fecha_venta = fecha;
        venta.mes = fecha.getMonth().toString();
        venta.cantidad = parametros.cantidad;
        venta.total = parametros.total;
        venta.comentarios = parametros.comentarios;
        venta.usuario_registro = parametros.usuario_registro;
        venta.producto = productoId;
        return venta.save();
    }).then(function(venta){
        res.status(200).send({
            mensaje: 'La venta se ha registrado correctamente',
            venta: venta
        })
    }).
    catch(function(err){
        res.status(404).send({mensaje:'Error registrando venta o el producto no tiene suficiente inventario'});
    });
}

module.exports = {
    realizarVenta
}