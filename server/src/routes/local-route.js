const express = require('express');
const router = express.Router();
const controller = require('../controllers/local-controller.js');

router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id_local', controller.put);

module.exports = router;