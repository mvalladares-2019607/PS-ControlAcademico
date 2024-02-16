const express = require('express');
const router = express.Router();
const maestroController = require('../controllers/maestro.controller');

//Get 
router.get('/', maestroController.maestrosGet);
// Post 
router.post('/', maestroController.crearMaestro);
// Put 
router.put('/:id', maestroController.actualizarPerfilMaestro);
module.exports = router;