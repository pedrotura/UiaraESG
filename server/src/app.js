const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();

//habilitando o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//criando as rotas
const index = require('./routes/index.js');
app.use('/', index);

const empresaRouter = require('./routes/empresa-route.js');
app.use('/empresas', empresaRouter);

module.exports = app;