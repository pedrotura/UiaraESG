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

const topicoRouter = require('./routes/topico-route.js');
app.use('/topicos', topicoRouter);

const formularioRouter = require('./routes/formulario-route.js');
app.use('/formularios', formularioRouter);

const perguntaRouter = require('./routes/pergunta-route.js');
app.use('/perguntas', perguntaRouter);

const respostaRouter = require('./routes/resposta-route.js');
app.use('/respostas', respostaRouter);

const respondenteRouter = require('./routes/respondente-route.js');
app.use('/respondentes', respondenteRouter);

const empresaRouter = require('./routes/empresa-route.js');
app.use('/empresas', empresaRouter);

const representanteRouter = require('./routes/representante-route.js');
app.use('/representantes', representanteRouter);

const contaRouter = require('./routes/conta-route.js');
app.use('/contas', contaRouter);

const localRouter = require('./routes/local-route.js');
app.use('/locais', localRouter);

const estadoRouter = require('./routes/estado-route.js');
app.use('/estados', estadoRouter);

module.exports = app;