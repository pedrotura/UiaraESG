const express = require('express');
const router = express.Router();
const controller = require('../controllers/representante-controller.js');

router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:cpf', controller.put);

module.exports = router;