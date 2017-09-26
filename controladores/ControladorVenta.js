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

    Producto.findById(productoId,(err,producto)=>{
        if (err){
            res.status(500).send({mensaje:'Error en la petición'});
        }else{
            if (!producto){
                res.status(404).send({mensaje:'El producto no existe'});
            }else{
                productoParametro = producto;
                if (producto.cantidad > 0){
                    productoParametro.cantidad = productoParametro.cantidad - parametros.cantidad;
                    Producto.findByIdAndUpdate(productoId,productoParametro,(err,productoActualizado)=>{
                        if (err){
                            res.status(500).send({mensaje:'Error en petición de actualización'});
                        }else{
                            if (!productoActualizado){
                                res.status(404).send({mensaje:'No se pudo actualizar el producto'});
                            }else{
                                let venta = new Venta();
                                let fecha = new Date();

                                venta.cliente = parametros.cliente;
                                venta.fecha_venta = fecha;
                                venta.mes = fecha.getMonth().toString();
                                venta.cantidad = parametros.cantidad;
                                venta.total = parametros.total;
                                venta.comentarios = parametros.comentarios;
                                venta.usuario_registro = parametros.usuario_registro;
                                venta.producto = productoId;

                                venta.save((err,ventaGuardada)=>{
                                    if (err){
                                        res.status(500).send({mensaje:'Error en petición de venta'});
                                    }else{
                                        if (!ventaGuardada){
                                            res.status(404).send({mensaje:'No se pudo realizar la venta'});
                                        }else{
                                            res.status(200).send({
                                                mensaje:'Se ha registrado la venta correctamente',
                                                venta:ventaGuardada
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }else{
                    res.status(404).send({mensaje:'No hay existencias de este producto'});
                }
            }
        }
    });
}

module.exports = {
    realizarVenta
}