'use strict'
// Contolador de Usuarios
var bcrypt = require('bcrypt-nodejs');
const Usuario = require('../modelos/Usuario');

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
        usuario.rol = 'ROL_ADMIN';

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

module.exports = {
    prueba,
    crearUsuario
}