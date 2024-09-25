'use strict'

const express = require('express');
const router = new express.Router();

//criando um endpoint para testar o servidor
router.get('/', (req, res, next) => {
    res.status(200).send({ "mensagem": "UiaraESG tá chegando!!" });
});

module.exports = router;