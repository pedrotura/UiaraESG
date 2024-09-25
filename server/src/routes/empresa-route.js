const express = require('express');
const router = express.Router();
const controller = require('../controllers/empresa-controller.js');

router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:cnpj_empresa', controller.put);

module.exports = router;