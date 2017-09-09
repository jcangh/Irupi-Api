'use strict'

const jwt = require('jwt-simple');
var moment = require('moment');
const clave = 'Irup1-n3n3-1984-1987';

exports.crearToken = function(usuario){
    let payload = {
        sub: usuario._id,
        name: usuario.nombres,
        surname: usuario.apellidos,
        email: usuario.correo,
        rol: usuario.rol,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix
    };

    return jwt.encode(payload,clave);
}