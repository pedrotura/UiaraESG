const express = require('express');
const router = express.Router();
const controller = require('../controllers/estado-controller.js');

router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id_estado', controller.put);

module.exports = router;