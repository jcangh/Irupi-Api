'use strict'
// Contolador de Productos
const bcrypt = require('bcrypt-nodejs');
const Producto = require('../modelos/Producto');
const jwt = require('../servicios/jwt');
const mongoosePaginate = require('mongoose-pagination');


function crearProducto(req,res){
    let producto = new Producto();
    let parametros = req.body;
    let fecha = new Date();

    producto.nombre = parametros.nombre;
    producto.descripcion = parametros.descripcion;
    producto.fecha_registro = fecha
    producto.cantidad = parametros.cantidad;
    producto.mes_registro = fecha.getMonth().toString();
    producto.precio_col = parametros.precio_col;
    producto.precio_br = parametros.precio_br;
    producto.usuario_registro = parametros.usuario_registro;
    
    producto.save((err,productoGuardado)=>{
        if (err){
            res.status(500).send({mensaje:'Ocurrió un error guardando '+err});
        }else{
            if (!productoGuardado){
                res.status(404).send({mensaje:'No se pudo guardar el producto'});
            }else{
                res.status(200).send({
                    mensaje:'El producto se ha guardado correctamente',
                    producto:productoGuardado
                })
            }
        }
    });
}

function consultarProductosN(req,res){
    Producto.find((err,productos)=>{
        if (err){
            res.status(500).send({mensaje: 'Error en la petición'});
        }else{
            if (!productos){
                res.status(404).send({mensaje:'No se pudo consultar los productos'});
            }else{
                res.status(200).send({
                    mensaje: 'consulta completa',
                    productos: productos
                })
            }
        }
    });
}

module.exports = {
    crearProducto,
    consultarProductosN
}