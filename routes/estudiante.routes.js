

const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudiante.controller');
//Get 
router.get('/', estudianteController.estudiantesGet);
// Post 
router.post('/', estudianteController.crearEstudiante);
// Put 
router.put('/:id', estudianteController.actualizarPerfilEstudiante);
// Delete
router.delete('/:id', estudianteController.eliminarEstudiante);
module.exports = router;

