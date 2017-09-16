'use strict'
// Contolador de Usuarios
var bcrypt = require('bcrypt-nodejs');
const Usuario = require('../modelos/Usuario');
const jwt = require('../servicios/jwt');
const mongoosePaginate = require('mongoose-pagination');

function prueba(req,res){
    res.status(200).send({
        mensaje: 'Primer respuesta get controlador usuarios'
    });
}

function crearUsuario(req,res){
    let usuario = new Usuario();

    let parametros = req.body;

    if (parametros.password != null && parametros.nombres != null && parametros.apellidos != null
    && parametros.correo != null){
        
        usuario.nombres = parametros.nombres;
        usuario.apellidos = parametros.apellidos;
        usuario.correo = parametros.correo;
        usuario.rol = parametros.rol;
        usuario.estado = 'ACTIVO';
        
        bcrypt.hash(parametros.password,null,null,function(err,hash){
            usuario.password = hash;
            usuario.save((err,usuarioGuardado)=>{
                if (err){
                    res.status(500).send({mensaje:'Ocurrió un error guardando'})
                }else{
                    if (!usuarioGuardado){
                        res.status(404).send({mensaje:'No se pudo guardar el usuario'});
                    }else{
                        res.status(200).send({
                            mensaje:'El usuario se ha guardado correctamente',
                            usuario:usuarioGuardado
                        })
                    }
                }
            })
        });


    }else{
        res.status(200).send({mensaje:'Introduzca todos los campos'})
    }
}

function actualizarUsuario(req,res){
    var idUsuario = req.params.id;
    var camposNuevos = req.body;

    if (idUsuario != req.user.sub){
        return res.status(500).send({mensaje: 'No tiene permisos para actalizar este usuario'});
    }

    Usuario.findByIdAndUpdate(idUsuario,camposNuevos,(err,usuarioActualizado)=>{
        if (err){
            res.status(500).send({mensaje: 'Error en la petición'});
        }else{
            if (!usuarioActualizado){
                res.status(404).send({mensaje: 'No se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({
                    mensaje: 'El usuario ha sido actualizado',
                    usuario: usuarioActualizado
                })
            }
        }
    });
}

function iniciarSesion(req,res){
    let params = req.body;
    
    let correo = params.correo;
    let password = params.password;

    Usuario.findOne({correo: correo.toLowerCase()},(err,usuario)=>{
        if (err){
            res.status(500).send({mensaje: 'Error en la petición'});
        }else{
            if (!usuario){
                res.status(404).send({mensaje: 'El correo ingresado no existe'});
            }else{
                bcrypt.compare(password,usuario.password,function(err,check){
                    if (check){
                        if (params.aut){
                            res.status(200).send({token:jwt.crearToken(usuario)});
                        }else{
                            if (usuario.estado !== 'ACTIVO'){
                                res.status(404).send({mensaje: 'El correo ingresado no está activo'});  
                            }else{
                                res.status(200).send({
                                    mensaje:'Inicio de sesión correcto',
                                    usuario:usuario
                                });
                            }
                        }
                    }
                });
            }
        }
    })
}

function consultarUsuarios(req,res){
    if (req.params.pagina){
        var pagina = req.params.pagina;
    }else{
        var pagina = 1;
    }

    let elementosPorPagina = 4;
    Usuario.find().sort('nombres').paginate(pagina,elementosPorPagina, function(err,usuarios,total){
        if (err){
            res.status(500).send({mensaje: 'Error en la petición'});
        }else{
            if (!usuarios){
                res.status(404).send({mensaje: 'No hay usuarios'});
            }else{
                res.status(200).send({
                    total: total,
                    usuarios:usuarios
                });
            }
        }
    });
}

function eliminarUsuario(req,res){
    var idUsuario = req.params.id;

    Usuario.findByIdAndRemove(idUsuario,(err,usuarioEliminado)=>{
        if (err){
            res.status(500).send({mensaje: 'Error en la petición'});
        }else{
            if (!usuarioEliminado){
                res.status(404).send({mensaje: 'No se pudo eliminar el usuario'});
            }else{
                res.status(200).send({
                    mensaje: 'El usuario se ha eliminado',
                    usuario: usuarioEliminado
                })
            }
        }
    });
}

module.exports = {
    prueba,
    crearUsuario,
    actualizarUsuario,
    iniciarSesion,
    consultarUsuarios,
    eliminarUsuario
}