const express = require('express');
const router = express.Router();
const controller = require('../controllers/resposta-controller.js');

router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id_respondente:id_pergunta', controller.put);

module.exports = router;