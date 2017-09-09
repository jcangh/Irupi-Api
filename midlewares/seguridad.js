'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const clave = 'Irup1-n3n3-1984-1987';

exports.autenticar = function(req,res,next){
    
    if (!req.headers.authorization){
        return res.status(403).send({mensaje:'No tiene autorización para realizar esta operación'});
    }

    let token = req.headers.authorization.replace(/['"]+/g,'');
    try {
        var payload = jwt.decode(token,clave);

        if (payload.exp <= moment().unix()){
            return res.status(401).send({mensaje:'El token ha expirado'});
        }
    } catch (error) {
        return res.status(404).send({mensaje:'El token no es correcto'}); 
    }

    req.user = payload;
    next();
}