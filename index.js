'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const CONFIG = require('./utils/Config');
const puerto = process.env.PORT || 3500;

let url = `mongodb://${CONFIG.BD_USUARIO}:${CONFIG.DB_PASS}@${CONFIG.URL_BASE_DATOS}`;
//'mongodb://admin:irupiadmin@ds115214.mlab.com:15214/irupi'
mongoose.Promise = global.Promise;
mongoose.connect(url, (err,res)=>{
    if (err){
        throw err;
    }else{
        console.log('Conexion a base de datos exitosa');
        app.listen(puerto,function(){
            console.log(`Servidor backend iniciado en ${puerto}`);
        });
    }
});
