'use strict'

const app = require('./app');

const puerto = process.env.PORT || 3500;

app.listen(puerto,function(){
    console.log(`Servidor backend iniciado en ${puerto}`);
});