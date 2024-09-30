const express = require('express');
const router = express.Router();
const controller = require('../controllers/topico-controller.js');

router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id_topico', controller.put);

module.exports = router;