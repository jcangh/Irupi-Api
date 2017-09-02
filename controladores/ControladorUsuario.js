'use strict'

function prueba(req,res){
    res.status(200).send({
        mensaje: 'Primer respuesta get controlador usuarios'
    });
}

module.exports = {
    prueba
}