const express = require('express');
const router = express.Router();
const controller = require('../controllers/respondente-controller.js');

router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id_respondente', controller.put);

module.exports = router;