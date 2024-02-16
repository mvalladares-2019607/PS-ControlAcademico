const express = require('express');
const router = express.Router();
const maestroController = require('../controllers/maestro.controller');

//Get 
router.get('/', maestroController.maestrosGet);

module.exports = router;