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

function consultarProducto(req,res){
    let productoId = req.params.id;

    Producto.findById(productoId,(err,producto)=>{
        if (err){
            res.status(500).send({mensaje: 'Error en la petición'});
        }else{
            if (!producto){
                res.status(404).send({mensaje: 'El producto no existe'});
            }else{
                res.status(200).send({
                    mensaje : 'Consulta exitosa',
                    producto:producto
                })
            }
        }
    })
}

function eliminarProducto(req,res){
    let productoId = req.params.id;

    Producto.findByIdAndRemove(productoId,(err,productoEliminado)=>{
        if (err){
            res.status(500).send({mensaje: 'Error en la petición'});
        }else{
            if (!productoEliminado){
                res.status(404).send({mensaje: 'El producto no se pudo eliminar'});
            }else{
                res.status(200).send({
                    mensaje: 'El producto se ha eliminado',
                    producto: productoEliminado
                })
            }
        }
    })
}

function consultarProductos(req,res){
    if (req.params.pagina){
        var pagina = req.params.pagina;
    }else{
        var pagina = 1;
    }

    let elementosPorPagina = 4;
    Producto.find().sort('nombre').paginate(pagina,elementosPorPagina,function(err,productos,total){
        if (err){
            res.status(500).send({mensaje:'Error en la petición'});
        }else{
            if (!productos){
                res.status(404).send({mensaje:'No se encontraron usuarios'});
            }else{
                res.status(200).send({
                    total:total,
                    productos:productos
                })
            }
        }
    });
}

function actualizarProducto(req,res){
    let productoId = req.params.id;
    let camposNuevos = req.body;

    Producto.findByIdAndUpdate(productoId,camposNuevos,(err,productoActualizado)=>{
        if (err){
            res.status(500).send({mensaje:'Error en la petición'});
        }else{
            if (!productoActualizado){
                res.status(404).send({mensaje: 'No se pudo actualizar el producto'});
            }else{
                res.status(200).send({
                    mensaje:'El producto se ha actualizado correctamente',
                    producto:productoActualizado
                })
            }
        }
    })
}
module.exports = {
    crearProducto,
    consultarProductosN,
    consultarProducto,
    eliminarProducto,
    consultarProductos,
    actualizarProducto
}