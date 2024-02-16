const express = require('express');
const router = express.Router();
const maestroController = require('../controllers/maestro.controller');

//Get 
router.get('/', maestroController.maestrosGet);
// Post 
router.post('/', maestroController.crearMaestro);
module.exports = router;